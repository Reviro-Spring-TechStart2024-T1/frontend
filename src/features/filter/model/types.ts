export interface FilterOption {
  id: number;
  label: string;
}
export interface FilterValues {
  beverage: FilterOption;
  price: FilterOption;
  amount: FilterOption;
}

export type TFilters = 'ID' | 'Name';
