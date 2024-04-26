export type TBeverage = {
  id: number;
  name: string;
  category: string;
  price: string;
  desc: string;
  quantity: string;
  image: object | File;
};

export type TModal = {
  type: 'create' | 'edit';
};
