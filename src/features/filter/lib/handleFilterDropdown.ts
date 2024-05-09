export const handleFilterDropdown =
  (state: boolean, setter: (bool: boolean) => void) => () => {
    setter(!state);
  };
