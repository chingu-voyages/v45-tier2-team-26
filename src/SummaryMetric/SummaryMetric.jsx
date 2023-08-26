import './SummaryMetric.css';
import { useState, useEffect, useMemo } from 'react';
import getMeteoriteData from '../services/publicAPI';
import NumberOfStrikesChart from './NumberOfStrikesChart';

function SummaryMetric() {
  // The state is for testing purposes only. It will be replaced by props later.
  const [meteoriteData, setMeteoriteData] = useState(null);
  useEffect(() => {
    getMeteoriteData().then((data) => setMeteoriteData(data));
  }, []);
  console.log('meteoriteData', meteoriteData);

  const getTotalStrikes = () => {
    if (!meteoriteData) {
      return null;
    }
    return meteoriteData.length;
  };

  const getAverageMass = () => {
    if (!meteoriteData) {
      return null;
    }

    console.log(
      'meteorite data with invalid mass',
      meteoriteData.filter(
        (data) => !(data.mass && !Number.isNaN(Number(data.mass))),
      ),
    );

    const dataWithValidMass = meteoriteData.filter(
      (data) => data.mass && !Number.isNaN(Number(data.mass)),
    );
    const totalMass = dataWithValidMass.reduce(
      (acc, curr) => acc + (curr.mass ? Number(curr.mass) : 0),
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
    const startingInterval = Math.floor(firstYear / 100) * 100;
    const endingInterval = Math.ceil(lastYear / 100) * 100;
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

    console.log('number of strikes by composition', numberOfStrikesByComposition);
    return numberOfStrikesByComposition;
  };

  const total = getTotalStrikes();
  const average = getAverageMass()?.toFixed(2);
  const numberOfStrikesByYear = getNumberOfStrikesByYear(50);
  const numberOfStrikesByComposition = getNumberOfStrikesByComposition();

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
      <div className="chartContainer">
        <div className="leftArrow" />
        <div className="chart">
          <NumberOfStrikesChart
            label="Total number of strikes by year"
            dataObject={numberOfStrikesByYear}
            type="bar"
          />
          <NumberOfStrikesChart
            label="Total number of strikes by composition"
            dataObject={numberOfStrikesByComposition}
            type="pie"
          />
        </div>
        <div className="rightArrow" />
      </div>
    </div>
  );
}

export default SummaryMetric;
