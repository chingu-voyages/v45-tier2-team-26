import './SummaryMetric.css';
import { useState, useEffect, useMemo } from 'react';
import getMeteoriteData from '../services/publicAPI';
import DataChart from './DataChart';
import compositionGroup from './compositionGroup';

function SummaryMetric() {
  // This state is for testing purposes only. It will be replaced by props later.
  const [meteoriteData, setMeteoriteData] = useState(null);
  useEffect(() => {
    getMeteoriteData().then((data) => setMeteoriteData(data.slice(0, 1000)));
  }, []);
  console.log('meteoriteData', meteoriteData);

  const [numberByYearStep, setNumberByYearStep] = useState(50);
  const [numberByCompositionType, setNumberOfCompositionType] = useState('overall');

  const getTotalStrikes = () => {
    if (!meteoriteData) {
      return null;
    }
    return meteoriteData.length;
  };

  const getAverageMass = () => {
    if (!meteoriteData || meteoriteData?.length === 0) {
      return null;
    }

    if (meteoriteData.length === 1) {
      const average = Number(meteoriteData[0].mass);
      if (Number.isNaN(average)) {
        return null;
      }
      return average;
    }

    console.log(
      'meteorite data with invalid mass',
      meteoriteData.filter(
        (data) => !(data.mass && !Number.isNaN(Number(data.mass) && Number(data.mass) > 0)),
      ),
    );

    const dataWithValidMass = meteoriteData.filter(
      (data) => data.mass && !Number.isNaN(Number(data.mass)) && Number(data.mass) > 0,
    );
    const totalMass = dataWithValidMass.reduce(
      (acc, curr) => acc + Number(curr.mass),
      0,
    );
    return totalMass / dataWithValidMass.length;
  };

  const parseYear = (year) => {
    if (!year) {
      return null;
    }
    const parsedYear = Number(year.slice(0, 4));
    if (Number.isNaN(parsedYear)) {
      return null;
    }
    return parsedYear;
  };

  const getNumberOfStrikesByYear = (step) => {
    if (!meteoriteData) {
      return null;
    }
    const dataWithValidYear = meteoriteData.filter(
      (data) => data.year && !Number.isNaN(Date.parse(data.year)),
    );
    console.log('meteorite data with invalid year', meteoriteData.filter(
      (data) => !(data.year && !Number.isNaN(Date.parse(data.year))),
    ));

    dataWithValidYear.sort((a, b) => (Date.parse(a.year) - Date.parse(b.year)));

    const firstYear = parseYear(dataWithValidYear[0].year);
    const lastYear = parseYear(dataWithValidYear[dataWithValidYear.length - 1].year);
    const startingInterval = Math.floor(firstYear / step) * step;
    const endingInterval = Math.floor(lastYear / step) * step;
    const numberOfStrikesByYear = {};
    for (let i = startingInterval; i <= endingInterval; i += step) {
      const yearStart = i;
      const yearEnd = i + step - 1;
      const strikesInInterval = dataWithValidYear.filter((data) => {
        const year = parseYear(data.year);
        return year >= yearStart && year <= yearEnd;
      }).length;
      numberOfStrikesByYear[`${yearStart}-${yearEnd}`] = strikesInInterval;
    }

    console.log('number of strikes by year', numberOfStrikesByYear);
    return numberOfStrikesByYear;
  };

  const getNumberOfStrikesByComposition = () => {
    if (!meteoriteData) {
      return null;
    }
    const dataWithValidComposition = meteoriteData.filter(
      (data) => data.recclass,
    );
    console.log('meteorite data with invalid composition', meteoriteData.filter(
      (data) => !(data.recclass),
    ));

    const numberOfStrikesByComposition = {};
    dataWithValidComposition.forEach((data) => {
      if (numberOfStrikesByComposition[data.recclass]) {
        numberOfStrikesByComposition[data.recclass] += 1;
      } else {
        numberOfStrikesByComposition[data.recclass] = 1;
      }
    });

    return numberOfStrikesByComposition;
  };

  const getGroupedNumberByComposition = (numberOfStrikesByComposition) => {
    if (!numberOfStrikesByComposition) {
      return null;
    }
    const groupedComposition = {};
    Object.keys(numberOfStrikesByComposition).forEach((composition) => {
      Object.keys(compositionGroup).forEach((group) => {
        if (compositionGroup[group].includes(composition)) {
          if (groupedComposition[group]) {
            groupedComposition[group][composition] = numberOfStrikesByComposition[composition];
          } else {
            groupedComposition[group] = {};
            groupedComposition[group][composition] = numberOfStrikesByComposition[composition];
          }
        }
      });
    });
    console.log('number of strikes by composition', numberOfStrikesByComposition);
    console.log('grouped composition', groupedComposition);
    return groupedComposition;
  };

  const getNumberOfStrikesData = (groupedStrikes) => {
    if (!groupedStrikes) {
      return null;
    }
    switch (numberByCompositionType) {
      case 'overall':
        return Object.keys(groupedStrikes).reduce((acc, group) => {
          const subGroup = groupedStrikes[group];
          const subGroupTotal = Object.keys(subGroup).reduce((acc, curr) => {
            const value = subGroup[curr];
            return acc + value;
          }, 0);
          acc[group] = subGroupTotal;
          return acc;
        }, {});
      case 'Carbonaceous chondrites':
        return groupedStrikes['Carbonaceous chondrites'];
      case 'Enstatite chondrites':
        return groupedStrikes['Enstatite chondrites'];
      case 'Ordinary chondrites':
        return groupedStrikes['Ordinary chondrites'];
      case 'Kakangari chondrites':
        return groupedStrikes['Kakangari chondrites'];
      case 'Primitive achondrites':
        return groupedStrikes['Primitive achondrites'];
      case 'Achondrites':
        return groupedStrikes.Achondrites;
      case 'Stony-iron':
        return groupedStrikes['Stony-iron'];
      case 'Iron':
        return groupedStrikes.Iron;
      case 'Unknown':
        return groupedStrikes.Unknown;
      default:
        return null;
    }
  };

  const total = useMemo(() => getTotalStrikes(), [meteoriteData]);
  const average = useMemo(() => getAverageMass()?.toFixed(2), [meteoriteData]);
  const numberByYearChartData = useMemo(
    () => getNumberOfStrikesByYear(numberByYearStep),
    [meteoriteData, numberByYearStep],
  );
  const numberByComposition = useMemo(() => getNumberOfStrikesByComposition(), [meteoriteData]);
  const groupedNumberByComposition = useMemo(
    () => getGroupedNumberByComposition(numberByComposition),
    [numberByComposition],
  );
  const numberByCompositionChartData = useMemo(
    () => getNumberOfStrikesData(groupedNumberByComposition),
    [groupedNumberByComposition, numberByCompositionType],
  );

  return (
    <div className="summaryContainer">
      <h1>Summary</h1>
      <p>
        Total number of strikes:
        {total}
      </p>
      <p>
        Average mass:
        {average}
      </p>
      <select
        className="chartTitle"
        aria-label="choose a chart title"
        name="ChartTitle"
        id="ChartTitle"
      >
        <option selected value="value1">
          value1
        </option>
        <option value="value2">value2</option>
        <option value="value3">value3</option>
      </select>
      <select
        className="numberByYearStep"
        aria-label="choose a step"
        name="Step"
        id="Step"
        onChange={(e) => setNumberByYearStep(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option selected value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <select
        className="numberOfCompositionType"
        aria-label="choose a composition type"
        name="CompositionType"
        id="CompositionType"
        onChange={(e) => setNumberOfCompositionType(e.target.value)}
      >
        <option value="overall">Overall</option>
        {Object.keys(compositionGroup).map((group) => (
          <option key={group} value={group}>{group}</option>))}
      </select>
      <div className="chartContainer">
        <div className="leftArrow" />
        <div className="chart">
          <DataChart
            label="Total number of strikes by year"
            dataObject={numberByYearChartData}
            type="bar"
            xLabel="Year"
            yLabel="Number of strikes"
          />
          <DataChart
            label="Total number of strikes by composition"
            dataObject={numberByCompositionChartData}
            type="doughnut"
          />
        </div>
        <div className="rightArrow" />
      </div>
    </div>
  );
}

export default SummaryMetric;
