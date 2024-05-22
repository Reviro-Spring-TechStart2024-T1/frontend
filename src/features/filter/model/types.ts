export interface FilterOption {
  id: number;
  key: string;
  label: string;
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
