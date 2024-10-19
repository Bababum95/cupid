import type { Price } from "@/types";

export const formatPrice = (
  { amount, currencyCode }: Price,
  minimumFractionDigits = 2
) => {
  return amount.toLocaleString("de-DE", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
    minimumFractionDigits,
    maximumFractionDigits: 2,
  });
};
