export const extractStructuredErrors = (
  data: Record<string, string[]>,
  isKeyNeeded: boolean = true,
) => {
  return Object.entries(data).map(([key, value]) => {
    if (isKeyNeeded) {
      const message = Array.isArray(value) ? value.join(', ') : value; //NOTE - Can also get only the first element value[0]
      return [key, message];
    } else {
      return Array.isArray(value) ? value.join(', ') : value;
    }
  });
};
