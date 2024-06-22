import { TTimeInterval, TTimeIntervalData } from '@/shared/services';

export const arrFromObj = (
  obj: TTimeInterval,
  key: keyof TTimeIntervalData,
) => {
  return Object.values(obj).map(period => {
    if (key === 'count') {
      return period.count;
    } else {
      return period.sum;
    }
  });
};
