export const extractStructuredErrors = (
  data: Record<string, string[]>,
  isKeyNeeded: boolean = true,
) => {
  return Object.entries(data).map(([key, value]) => {
    if (isKeyNeeded) {
      let message;

      if (Array.isArray(value)) {
        message = value.join(', ');
      }
      if (value !== null && typeof value === 'object') {
        message = Object.entries(value)
          .map(([_, value]) => value)
          .join(', '); //NOTE - Can also get only the first element value[0]
      } else {
        message = value;
      }
      return [key, message];
    }
    if (!isKeyNeeded) {
      return Array.isArray(value) ? value.join(', ') : value;
    }
  });
};
