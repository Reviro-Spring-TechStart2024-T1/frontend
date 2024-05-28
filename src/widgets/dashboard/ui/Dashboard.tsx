'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

import { Filter, FilterOption } from '@/features/filter';
import { TOrderTimePeriod, useOrdersStatistics } from '@/shared';
import { Select } from '@/shared/ui/Select';
import { SelectOption } from '@/shared/ui/Select/types/Select.types';
import {
  Card,
  dashboardData,
  dashboardOptions,
  timeOptions,
} from '@/widgets/dashboard';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  LineController,
);
export const Dashboard = () => {
  const [filterItems, setFilterItems] = useState<
    FilterOption<TOrderTimePeriod> | undefined
  >(() => timeOptions.find(option => option.label === 'Monthly'));

  const {
    statistics,
    chartData,
    chartLabels,
    overallOrdersQuantity,
    overallOrdersSum,
    isLoading,
  } = useOrdersStatistics(filterItems?.label!);

  const lineChartData = dashboardData(chartLabels, chartData);

  const handleOnFilterChange = (value: SelectOption | null) =>
    setFilterItems(value as FilterOption<TOrderTimePeriod>);

  return (
    <>
      <div className="cards flex gap-1 lg:flex-col">
        <Card variant="quantity" data={overallOrdersQuantity} />
        <Card variant="sum" data={overallOrdersSum} />
      </div>
      {isLoading && <div>Loading...</div>}
      {statistics && (
        <>
          <Filter>
            <Select
              options={timeOptions}
              value={filterItems as SelectOption}
              onChange={handleOnFilterChange}
              title="Time period"
            />
          </Filter>
          <Line data={lineChartData} options={dashboardOptions} />
        </>
      )}
    </>
  );
};
