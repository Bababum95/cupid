import type { Rating } from "@/types";

export const calculatePercentage = (value: number, total: number): number => {
  return total ? (value / total) * 100 : 0;
};

export const getAverageRating = ({ total, ...ratings }: Rating): string => {
  if (total === 0) return "0,0";

  let totalWeightedRating = 0;

  for (const key in ratings) {
    const value = Number(key);

    if (!ratings[key] || isNaN(value)) continue;

    totalWeightedRating += value * ratings[key];
  }

  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(totalWeightedRating / total);
};
