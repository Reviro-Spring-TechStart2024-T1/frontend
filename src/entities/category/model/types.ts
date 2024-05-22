export type TCategory = {
  id: number;
  name: string;
};

export type TCategories = {
  categories: TCategory[] | undefined;

  category?: TCategory;
  isListActive?: boolean;
  onCategoryChosen?: (category: TCategory) => void;
};
