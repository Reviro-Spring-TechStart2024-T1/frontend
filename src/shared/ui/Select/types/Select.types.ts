export interface SelectOption {
  id: number;
  label: string;
}

export interface SelectProps {
  value: SelectOption | null;
  options: SelectOption[];
  onChange: (value: SelectOption) => void;
}
