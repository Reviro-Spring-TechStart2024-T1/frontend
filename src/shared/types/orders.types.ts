export type TOrdersFiltersKeys = keyof TOrdersFilters;

export type TFilter = TOrdersFilters[TOrdersFiltersKeys];

export type TOrdersSortKeys = keyof TOrdersSortBy;

export type TSort = TOrdersSortBy[TOrdersSortKeys];
