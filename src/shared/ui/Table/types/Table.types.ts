import { ReactNode } from 'react';

export interface ColumnType<T> {
  key: string;
  title: string;
  render?: (record: T) => ReactNode;
}

export type ColumnsType<T> = ColumnType<T>[];

export interface TableProps<T extends { id: string | number }> {
  columns: ColumnsType<T>;
  data?: T[];
}
