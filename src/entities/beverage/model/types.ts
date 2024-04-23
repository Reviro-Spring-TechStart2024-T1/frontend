export type TBeverage = {
  id: number;
  name: string;
  category: string;
  price: number | null;
  desc: string;
  image: undefined | null;
  quantity: number;
};

export type TModal = {
  type: 'create' | 'edit';
};
