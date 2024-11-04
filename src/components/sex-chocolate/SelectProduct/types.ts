export type SellingPlanGroupType = {
  sellingPlans: {
    id: string;
    name: string;
    options: { name: string; value: string }[];
  }[];
  name: string;
  discount: number;
};
