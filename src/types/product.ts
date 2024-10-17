import type { Image, Price, PriceNode } from "@/types";

export type Product = {
  id: string;
  title: string;
  images?: Image[];
  price: Price;
  components?: { quantity?: number }[][] | null;
  isBundle: boolean;
};

export type ProductNode = {
  handle: string;
  id: string;
  title: string;
  images?: { edges: { node: Image }[] };
  priceRange: {
    minVariantPrice: PriceNode;
  };
  variants: {
    edges: {
      node: {
        components: {
          edges: {
            node: {
              quantity?: number;
            };
          }[];
        };
      };
    }[];
  };
};
