export type TBeverage = {
  id: number;
  menu: number;
  name: string;
  category: string;
  price: string;
  description: string;
  in_stock: string;
};

export type TModal = {
  type: 'create' | 'edit';
};
