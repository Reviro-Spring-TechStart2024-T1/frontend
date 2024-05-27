'use client';

import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

import { Card } from '@/widgets/dashboard';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LineController,
);

const Dashboard = () => {
  const data: ChartData<'line'> = {
    labels: ['2024-05-25', '2024-05-26', '2024-05-27', '2024-05-28'],
    datasets: [
      {
        label: 'Orders',
        backgroundColor: 'rgba(41, 43, 116, 0.2)', // Shaded area
        borderColor: '#292b74',
        data: [50, 70, 100, 80],
        fill: true, // Enable the fill for the shaded area
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }

            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <>
      <div className="cards flex gap-1">
        <Card variant="quantity" data="381" />
        <Card variant="sum" data="216" />
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default Dashboard;
