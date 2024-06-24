export interface TTimeInterval {
  [key: string]: TTimeIntervalData;
}

export interface TTimeIntervalData {
  count: number;
  sum: number;
}

export interface TOrderStatisticsResponse {
  this_week: TTimeInterval;
  this_month: TTimeInterval;
  this_quarter: TTimeInterval;
  this_year: TTimeInterval;
}

export type TOrderTimePeriod = 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

export interface OrdersStatisticProps {
  establishmentId: number | undefined;
  timePeriod: TOrderTimePeriod;
}
