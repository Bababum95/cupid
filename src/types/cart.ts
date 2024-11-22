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
  productId: string;
  quantity: number;
  title: string;
  description: string;
  price: Price;
  compareAtPrice: Price | null;
  image: Image | null;
  removing?: boolean;
};

export type CartState = {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: unknown;
  id: string | null;
  checkoutUrl?: string;
  lines: CartLineType[];
  total: Price | null;
  discountCodes: string[];
  showExtraBox?: boolean;
};

export type CartResponseCostType = {
  totalAmount: PriceNode;
  amountPerQuantity: PriceNode;
  compareAtAmountPerQuantity: PriceNode | null;
};

export type CartResponse = {
  id: string;
  checkoutUrl: string;
  discountCodes: { code: string }[];
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: CartResponseCostType;
      sellingPlanAllocation: {
        id: string;
        name: string;
      } | null;
      discountAllocations: {
        __typename?: string;
        title?: string;
      }[];
      merchandise: {
        id: string;
        image: Image | null;
        product: {
          title: string;
          description: string;
          handle: string;
        };
      };
    }[];
  };
  cost: {
    totalAmount: PriceNode;
  };
};
