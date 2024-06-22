export const addition = (arr: number[]) =>
  arr.reduce((acc, order) => {
    acc += order;

    return acc;
  }, 0);
