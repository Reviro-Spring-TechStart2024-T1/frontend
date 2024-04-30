'use client';

import { useEffect } from 'react';
import { Dayjs } from 'dayjs';

export const useMonitorTimePicker = (
  dayjsTime: Dayjs | null,
  setter: (formattedTime: string) => void,
) => {
  useEffect(() => {
    if (dayjsTime) {
      const neededFormat = dayjsTime.format('HH:mm');
      console.log(neededFormat);
      setter(neededFormat);
    }
  }, [dayjsTime, setter]);
};
