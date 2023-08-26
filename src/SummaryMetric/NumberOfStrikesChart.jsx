import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function NumberByYearChart({ label, dataObject, type }) {
  if (!dataObject) {
    return null;
  }
  console.log('numberOfStrikesByYear', dataObject);
  console.log('labels', Object.keys(dataObject));
  console.log('data', Object.values(dataObject));
  const data = {
    labels: Object.keys(dataObject),
    datasets: [
      {
        label,
        data: Object.values(dataObject),
      },
    ],
  };
  switch (type) {
    case 'bar':
      return <Bar data={data} key={JSON.stringify(data)} />;
    case 'pie':
      return <Pie data={data} key={JSON.stringify(data)} />;
    default:
      return <Bar data={data} key={JSON.stringify(data)} />;
  }
}

export default NumberByYearChart;
