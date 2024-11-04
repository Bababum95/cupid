import type { PriceNode } from "@/types";

export type GiftResponse = {
  title: string;
  variants: {
    nodes: {
      id: string;
      price: PriceNode;
    }[];
  };
  code: {
    value: string;
  };
};

export type GiftsResponse = {
  [key: string]: {
    title: string;
    variants: {
      nodes: {
        id: string;
        price: PriceNode;
      }[];
    };
    code: {
      value: string;
    };
  };
};

export type GiftType = {
  id: string;
  title: string;
  price: string;
  code: string | null;
};
