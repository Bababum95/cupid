export type GiftType = {
  id: string;
  title: string;
  price: string;
  code: string | null;
};

export type SellingPlanGroupType = {
  sellingPlans: {
    id: string;
    name: string;
    options: { name: string; value: string }[];
  }[];
  name: string;
  discount: number;
};
