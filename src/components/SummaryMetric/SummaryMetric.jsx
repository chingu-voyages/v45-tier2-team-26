import './SummaryMetric.css';
import { useState, useEffect, useMemo } from 'react';
import getMeteoriteData from '../../services/publicAPI';
import DataChart from './DataChart';
import compositionGroup from './compositionGroup';

function SummaryMetric() {
  // This state is for testing purposes only. It will be replaced by props later.
  const [meteoriteData, setMeteoriteData] = useState(null);
  const [switchChart, setSwitchChart] = useState(0);
  useEffect(() => {
    // console.log('testing');
    getMeteoriteData().then((data) => setMeteoriteData(data.slice(0)));
  }, []);

  // console.log('switchChart', switchChart);

  const changeChart = (index, chartLength) => {
    setSwitchChart((prev) => {
      const newIndex = (prev + index) % chartLength;
      return newIndex < 0 ? chartLength + newIndex : newIndex;
    });
  };

  const [numberByYearStep, setNumberByYearStep] = useState(50);
  const [numberByCompositionType, setNumberOfCompositionType] = useState('overall');
  const [yearChartType, setYearChartType] = useState('bar');
  const [compositionChartType, setCompositionChartType] = useState('doughnut');

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
      const average = Number(meteoriteData[0]['mass (g)']);
      if (Number.isNaN(average)) {
        return null;
      }
      return average;
    }

    // console.log(
    //   'meteorite data with invalid mass',
    //   meteoriteData.filter(
    //     (data) => !(data['mass (g)'] && !Number.isNaN(Number(data['mass (g)']) && Number(data['mass (g)']) > 0)),
    //   ),
    // );

    const dataWithValidMass = meteoriteData.filter(
      (data) => data['mass (g)'] && !Number.isNaN(Number(data['mass (g)'])) && Number(data['mass (g)']) > 0,
    );
    const totalMass = dataWithValidMass.reduce(
      (acc, curr) => acc + Number(curr['mass (g)']),
      0,
    );
    return totalMass / dataWithValidMass.length;
  };

  // const parseYear = (year) => {
  //   if (!year) {
  //     return null;
  //   }
  //   const parsedYear = Number(year.slice(0, 4));
  //   if (Number.isNaN(parsedYear)) {
  //     return null;
  //   }
  //   return parsedYear;
  // };

  const getNumberOfStrikesByYear = (step) => {
    if (!meteoriteData || meteoriteData?.length === 0) {
      return null;
    }
    const dataWithValidYear = meteoriteData.filter(
      (data) => data.year && !Number.isNaN(data.year),
    );
    // console.log('meteorite data with invalid year', meteoriteData.filter(
    //   (data) => !(data.year && !Number.isNaN(data.year)),
    // ));

    dataWithValidYear.sort((a, b) => Number(a.year) - Number(b.year));

    const firstYear = Number(dataWithValidYear[0].year);
    const lastYear = Number(dataWithValidYear[dataWithValidYear.length - 1].year);
    const startingInterval = Math.floor(firstYear / step) * step;
    const endingInterval = Math.floor(lastYear / step) * step;
    const numberOfStrikesByYear = {};
    for (let i = startingInterval; i <= endingInterval; i += step) {
      const yearStart = i;
      const yearEnd = i + step - 1;
      const strikesInInterval = dataWithValidYear.filter((data) => {
        const year = Number(data.year);
        return year >= yearStart && year <= yearEnd;
      }).length;
      numberOfStrikesByYear[`${yearStart}-${yearEnd}`] = strikesInInterval;
    }

    // console.log('number of strikes by year', numberOfStrikesByYear);
    return numberOfStrikesByYear;
  };

  const getNumberOfStrikesByComposition = () => {
    if (!meteoriteData || meteoriteData?.length === 0) {
      return null;
    }

    const dataWithValidComposition = meteoriteData.filter(
      (data) => data.recclass,
    );
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
    // console.log('number of strikes by composition', numberOfStrikesByComposition);
    // console.log('grouped composition', groupedComposition);
    return groupedComposition;
  };

  const getNumberOfStrikesData = (groupedStrikes) => {
    if (!groupedStrikes) {
      return null;
    }

    // console.log('test', numberByCompositionType);

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

  const charts = [
    {
      title: 'Total number of strikes by year',
      element: numberByYearChartData ? (
        yearChartType === 'bar' ? (
          <DataChart
            label="Total number of strikes by year"
            dataObject={numberByYearChartData}
            type="bar"
            xLabel="Year"
            yLabel="Number of strikes"
          />
        ) : (
          <DataChart
            label="Total number of strikes by year"
            dataObject={numberByYearChartData}
            type="doughnut"
          />
        )
      ) : (
        <div className="placeholder-container">
          <div className="no-data" />
          <p>No data for this chart</p>
        </div>
      ),
      option: (yearChartType === 'bar' ? (
        <label htmlFor="Step">
          Yearly Interval:
          {' '}
          <select
            className="numberByYearStep"
            aria-label="choose a step"
            name="Step"
            id="Step"
            value={numberByYearStep}
            onChange={(e) => setNumberByYearStep(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      ) : null
      ),
    },
    {
      title: 'Total number of strikes by composition',
      element: numberByCompositionChartData ? (
        compositionChartType === 'doughnut' ? (
          <DataChart
            label="Total number of strikes by composition"
            dataObject={numberByCompositionChartData}
            type="doughnut"
          />
        ) : (
          <DataChart
            label="Total number of strikes by composition"
            dataObject={numberByCompositionChartData}
            type="bar"
            xLabel="Composition"
            yLabel="Number of strikes"
          />
        )
      )
        : (
          <div className="placeholder-container">
            <div className="no-data" />
            <p>No data for this chart</p>
          </div>
        ),
      option: (
        <label htmlFor="CompositionType">
          Composition Type:
          <select
            className="numberOfCompositionType"
            aria-label="choose a composition type"
            name="CompositionType"
            id="CompositionType"
            value={numberByCompositionType}
            onChange={(e) => setNumberOfCompositionType(e.target.value)}
          >
            <option value="overall">Overall</option>
            {Object.keys(compositionGroup).map((group) => (
              <option key={group} value={group}>{group}</option>))}
          </select>
        </label>
      ),
    },
  ];

  const handleChartTypeChange = (e) => {
    switch (switchChart) {
      case 0:
        setYearChartType(e.target.value);
        break;
      case 1:
        setCompositionChartType(e.target.value);
        break;
      default:
        break;
    }
  };

  const getChartTypeValue = () => {
    switch (switchChart) {
      case 0:
        return yearChartType;
      case 1:
        return compositionChartType;
      default:
        return null;
    }
  };

  return (
    <div className="summaryContainer">
      <h1>Summary</h1>
      <p>
        Total number of strikes:
        {` ${total || 'N/A'}`}
      </p>
      <p>
        Average mass:
        {` ${average || 'N/A'} (g)`}
      </p>
      <div className="chart">
        {meteoriteData?.length > 0
          ? (
            <>
              <div className="chartTitleContainer">
                <label htmlFor="ChartTitle">
                  Chart:
                  {' '}
                  <select name="ChartTitle" className="chartTitle" onChange={(e) => setSwitchChart(Number(e.target.value))} value={switchChart}>
                    {charts.map((chart, index) => (
                      <option key={chart.title} value={index}>
                        {chart.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="ChartType">
                  Chart Type:
                  <select name="ChartType" className="chartType" onChange={handleChartTypeChange} value={getChartTypeValue()}>
                    <option value="bar">Bar</option>
                    <option value="doughnut">Doughnut</option>
                  </select>
                </label>
                {charts[switchChart].option}
              </div>
              <div className="chartDetails">
                <div onClick={() => changeChart(-1, charts.length)} className="leftArrow" />
                <div className="data">
                  {charts[switchChart].element}
                </div>
                <div onClick={() => changeChart(1, charts.length)} className="rightArrow" />
              </div>
            </>
          )
          : (
            <div>
              <p>There is no data to display</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default SummaryMetric;
