export interface SelectOption {
  id: number;
  key: string;
  label: string;
}

export interface SelectProps {
  value: SelectOption | null;
  options: SelectOption[];
  title?: string;
  any?: string;
  placeholder?: string;
  onChange: (value: SelectOption | null) => void;
}
