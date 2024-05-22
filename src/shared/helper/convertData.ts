import dayjs from 'dayjs';

export const dateToDayHour = (date?: string) => {
  if (date) {
    const dt = dayjs(date).format('DD-MM-YYYY | H:mm');
    return dt;
  }
  return '';
};
