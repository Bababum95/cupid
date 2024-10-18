import type { PriceNode } from "@/types";

export type InitialDataType = [
  {
    [key: string]: {
      id: string;
      title: string;
      priceRange: { maxVariantPrice: PriceNode };
    };
  },
  {
    product: {
      sellingPlanGroups: {
        nodes: {
          name: string;
          sellingPlans: {
            nodes: {
              id: string;
              name: string;
              options: {
                name: string;
                value: string;
              }[];
            }[];
          };
        }[];
      };
    };
  }
];

export type GiftType = {
  id: string;
  title: string;
  price: string;
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
