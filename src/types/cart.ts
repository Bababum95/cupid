import { Image } from "./image";
import { Price, PriceNode } from "./price";

export type CartLine = {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
};

export type CreateCartInput = {
  lines: CartLine[];
  discountCodes: string[];
};

export type CartLineType = {
  id: string;
  quantity: number;
  title: string;
  description: string;
  price: Price;
  compareAtPrice: Price | null;
  image: Image;
};

export type CartState = {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: unknown;
  id: string | null;
  checkoutUrl?: string;
  lines: CartLineType[];
  total: Price | null;
};

export type CartResponseCostType = {
  totalAmount: PriceNode;
  amountPerQuantity: PriceNode;
  compareAtAmountPerQuantity: PriceNode | null;
};

export type CartResponse = {
  id: string;
  checkoutUrl: string;
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: CartResponseCostType;
      merchandise: {
        image: Image;
        product: {
          title: string;
          description: string;
        };
      };
    }[];
  };
  cost: {
    totalAmount: PriceNode;
  };
};
