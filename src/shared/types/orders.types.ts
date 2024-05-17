export type TOrdersFilters = {
  status: 'Pending' | 'Completed' | 'Cancelled'; //NOTE - Pick<TOrder, 'status> was a good choice, but it is not easy to get the first letter in uppercase.
};

export type TOrdersFiltersKeys = keyof TOrdersFilters;

export type TFilter = TOrdersFilters[TOrdersFiltersKeys];

export type TOrdersSortBy = {
  time: 'Newest first' | 'Oldest first';
};

export type TOrdersSortKeys = keyof TOrdersSortBy;

export type TSort = TOrdersSortBy[TOrdersSortKeys];
