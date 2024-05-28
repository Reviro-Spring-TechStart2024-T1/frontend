export interface FilterOption<T = string> {
  id: number;
  key: string;
  label: T;
}
export interface FilterItem {
  beverage: FilterOption | null;
  status: FilterOption | null;
  time: FilterOption | null;
}
export interface FilterProps {
  filterItems: FilterItem[];
  setFilterItems: (value: FilterItem[]) => void;
}
