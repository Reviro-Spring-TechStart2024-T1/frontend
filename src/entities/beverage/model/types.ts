export type TBeverage = {
  id: number;
  name: string;
  category: string;
  price: number | null;
  desc: string;
  image: undefined | null;
  isAvailable: boolean;
};

export type TModal = {
  type: 'create' | 'edit';
};
