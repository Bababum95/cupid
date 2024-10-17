import type { Price } from "@/types";

export const formatPrice = ({ amount, currencyCode }: Price) => {
  return amount.toLocaleString("de-DE", {
    style: "currency",
    currency: currencyCode,
  });
};
