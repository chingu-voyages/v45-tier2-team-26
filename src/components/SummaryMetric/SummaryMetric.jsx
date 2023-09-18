/* eslint-disable react/prop-types */
import './SummaryMetric.css';
import { useState, useMemo } from 'react';
import DataChart from './DataChart';
import compositionGroup from './compositionGroup';
import {
  getTotalStrikes,
  getAverageMass,
  getNumberOfStrikesByYear,
  getNumberOfStrikesByComposition,
  getGroupedNumberByComposition,
  getNumberByCompositionChartData,
} from './summaryHelper';

function SummaryMetric({ searchResults }) {
  const [switchChart, setSwitchChart] = useState(0);

  const changeChart = (index, chartLength) => {
    setSwitchChart((prev) => {
      const newIndex = (prev + index) % chartLength;
      return newIndex < 0 ? chartLength + newIndex : newIndex;
    });
  };

  const [numberByYearStep, setNumberByYearStep] = useState(50);
  const [numberByCompositionType, setNumberOfCompositionType] = useState('overall');
  // States for chart type, allow user to switch between bar and doughnut chart for each chart
  const [yearChartType, setYearChartType] = useState('bar');
  const [compositionChartType, setCompositionChartType] = useState('doughnut');

  const total = getTotalStrikes(searchResults);
  const average = useMemo(() => getAverageMass(searchResults)?.toFixed(2), [searchResults]);
  const numberByYearChartData = useMemo(
    () => getNumberOfStrikesByYear(searchResults, numberByYearStep),
    [searchResults, numberByYearStep],
  );
  const numberByComposition = useMemo(
    () => getNumberOfStrikesByComposition(searchResults),
    [searchResults],
  );
  // eslint-disable-next-line max-len
  const groupedNumberByComposition = getGroupedNumberByComposition(compositionGroup, numberByComposition);

  // eslint-disable-next-line max-len
  const numberByCompositionChartData = getNumberByCompositionChartData(groupedNumberByComposition, numberByCompositionType);

  // Abstract the following functions from charts array to make the code more readable
  const getYearChartElement = (numberByYearChartData, yearChartType) => {
    if (!numberByYearChartData) {
      return (
        <div className="placeholder-container">
          <div className="no-data" />
          <p>No data for this chart</p>
        </div>
      );
    }

    if (yearChartType === 'bar') {
      return (
        <DataChart
          label="Total number of strikes by year"
          dataObject={numberByYearChartData}
          type="bar"
          xLabel="Year"
          yLabel="Number of strikes"
        />
      );
    }

    return (
      <DataChart
        label="Total number of strikes by year"
        dataObject={numberByYearChartData}
        type="doughnut"
      />
    );
  };

  const getYearChartOption = (yearChartType, numberByYearStep, setNumberByYearStep) => {
    if (yearChartType !== 'bar') {
      return null;
    }

    return (
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
    );
  };

  const getCompositionChartElement = (numberByCompositionChartData, compositionChartType) => {
    if (!numberByCompositionChartData) {
      return (
        <div className="placeholder-container">
          <div className="no-data" />
          <p>No data for this chart</p>
        </div>
      );
    }

    if (compositionChartType === 'doughnut') {
      return (
        <DataChart
          label="Total number of strikes by composition"
          dataObject={numberByCompositionChartData}
          type="doughnut"
        />
      );
    }

    return (
      <DataChart
        label="Total number of strikes by composition"
        dataObject={numberByCompositionChartData}
        type="bar"
        xLabel="Composition"
        yLabel="Number of strikes"
      />
    );
  };

  const getCompositionChartOption = (
    numberByCompositionType,
    setNumberOfCompositionType,
    compositionGroup,
  ) => (
    <label htmlFor="CompositionType">
      Composition Type:
      {' '}
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
  );

  const charts = [
    {
      title: 'Total number of strikes by year',
      element: getYearChartElement(numberByYearChartData, yearChartType),
      option: getYearChartOption(yearChartType, numberByYearStep, setNumberByYearStep),
    },
    {
      title: 'Total number of strikes by composition',
      element: getCompositionChartElement(numberByCompositionChartData, compositionChartType),
      option:
        getCompositionChartOption(
          numberByCompositionType,
          setNumberOfCompositionType,
          compositionGroup,
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

  const handleReset = () => {
    switch (switchChart) {
      case 0:
        setNumberByYearStep(50);
        setYearChartType('bar');
        break;
      case 1:
        setNumberOfCompositionType('overall');
        setCompositionChartType('doughnut');
        break;
      default:
        break;
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
        {searchResults?.length > 0
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
                  {' '}
                  <select name="ChartType" className="chartType" onChange={handleChartTypeChange} value={getChartTypeValue()}>
                    <option value="bar">Bar</option>
                    <option value="doughnut">Doughnut</option>
                  </select>
                </label>
                {charts[switchChart].option}
                <button className="searchBtn" type="button" onClick={handleReset}>Reset to Default</button>
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
