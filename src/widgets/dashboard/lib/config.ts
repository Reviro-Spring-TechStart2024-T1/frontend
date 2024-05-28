import { ChartData, ChartOptions } from 'chart.js';

export function dashboardData(
  labels: string[] = ['2024-05-25', '2024-05-26', '2024-05-27', '2024-05-28'],
  data: number[] = [50, 70, 100, 80],
): ChartData<'line'> {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Orders',
        backgroundColor: 'rgba(41, 43, 116, 0.2)',
        borderColor: '#292b74',
        data: data,
        fill: true,
        tension: 0.4,
      },
    ],
  };
}

export const dashboardOptions: ChartOptions<'line'> = {
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
