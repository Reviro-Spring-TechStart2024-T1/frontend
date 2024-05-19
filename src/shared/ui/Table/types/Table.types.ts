import { ReactNode } from 'react';

export interface ColumnType<T> {
  key: string;
  title: string;
  width?: string;
  render?: (record: T) => ReactNode;
}

export type ColumnsType<T> = ColumnType<T>[];

export interface TableProps<T extends { id: string | number }> {
  columns: ColumnsType<T>;
  data?: T[];
  currentPage?: number;
  pages?: number;
  onChange?: (value: number) => void;
}
