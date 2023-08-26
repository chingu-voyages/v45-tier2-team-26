import './SummaryMetric.css';
import { useState, useEffect } from 'react';
import getMeteoriteData from '../services/publicAPI';

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
      meteoriteData.filter(
        (data) => !(data.mass && !Number.isNaN(Number(data.mass))),
      ),
    );

    const validData = meteoriteData.filter(
      (data) => data.mass && !Number.isNaN(Number(data.mass)),
    );
    const totalMass = validData.reduce(
      (acc, curr) => acc + (curr.mass ? Number(curr.mass) : 0),
      0,
    );
    return totalMass / validData.length;
  };

  const total = getTotalStrikes();
  const average = getAverageMass();

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
        <option
          selected
          value="value1"
        >
          value1
        </option>
        <option value="value2">value2</option>
        <option value="value3">value3</option>
      </select>
      <div className="chartContainer">
        <div className="leftArrow" />
        <div className="chart" />
        <div className="rightArrow" />
      </div>
    </div>
  );
}

export default SummaryMetric;
