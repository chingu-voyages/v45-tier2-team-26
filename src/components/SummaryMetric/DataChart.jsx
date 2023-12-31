/* eslint-disable react/prop-types */
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

function DataChart({
  label, dataObject, type, xLabel, yLabel,
}) {
  if (!dataObject) {
    return null;
  }

  const data = {
    labels: Object.keys(dataObject),
    datasets: [
      {
        label,
        data: Object.values(dataObject),
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const sum = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
          const percentage = Math.round((value / sum) * 100);
          if (percentage > 2) {
            const dataLabels = context.chart.data.labels[context.dataIndex].split(' ');
            const shortLabel = dataLabels[dataLabels.length - 1];
            return `${shortLabel} ${percentage}%`;
          }
          return null;
        },
      },
    },
  };

  const barOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: yLabel,
        },
      },
      x: {
        title: {
          display: true,
          text: xLabel,
        },
      },
      responsive: false,
      maintainAspectRatio: false,
    },
  };

  switch (type) {
    case 'bar':
      return <Bar data={data} key={JSON.stringify(data)} options={barOptions} />;
    case 'doughnut':
      return <Doughnut data={data} key={JSON.stringify(data)} options={doughnutOptions} />;
    default:
      return <Bar data={data} key={JSON.stringify(data)} options={barOptions} />;
  }
}

export default DataChart;
