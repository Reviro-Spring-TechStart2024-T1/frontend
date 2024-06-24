import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const dateToDayHour = (date?: string) => {
  if (date) {
    const dt = dayjs(date).format('DD-MM-YYYY | H:mm');
    return dt;
  }
  return '';
};

export const dateToRelative = (date?: string) => {
  if (date) {
    const dt = dayjs(date).fromNow();
    return dt;
  }
  return '';
};
