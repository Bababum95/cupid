import type { PriceNode, Image } from "@/types";

export type GiftsResponse = {
  [key: string]: {
    title: string;
    description?: string;
    featuredImage?: Image | null;
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
  description?: string;
  image?: Image | null;
};
