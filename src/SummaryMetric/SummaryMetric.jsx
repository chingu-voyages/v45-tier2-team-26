import './SummaryMetric.css';

function SummaryMetric() {
  return (
    <div className="summaryContainer">
      <h1>Summary</h1>
      <p>Total number of strikes: [number]</p>
      <p>Average mass: [number]</p>
      <select
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
      <div className="previous" />
      <div className="chart" />
      <div className="next" />
    </div>
  );
}

export default SummaryMetric;
