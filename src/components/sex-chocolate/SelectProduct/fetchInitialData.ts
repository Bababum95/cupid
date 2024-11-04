/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchShopify } from "@/lib/shopify";
import { dataUtils } from "@/utils";
import { sellingPlansFragment, giftFragment } from "@/graphql";
import type { GiftType } from "@/types";

import type { SellingPlanGroupType } from "./types";

type InitialDataType = {
  sellingPlans: SellingPlanGroupType[];
  gifts: GiftType[];
};

export const fetchInitialData = async ({
  gifts,
}: {
  gifts: string[];
}): Promise<InitialDataType | null> => {
  const combinedQuery = `
      query CombinedQuery($handle: String) {
        ${gifts
          .map(
            (id, index) => `gift_${index}: product(id: "${id}") {
            ...GiftFragment
          }`
          )
          .join("\n")}
        sellingPlans: product(handle: $handle) {
          ...SellingPlansFragment
        }
      }
      ${sellingPlansFragment}
      ${giftFragment}
      `;

  try {
    const { sellingPlans, ...giftsResponse } = await fetchShopify({
      query: combinedQuery,
      variables: { handle: "cupid-chocolate" },
    });

    const giftsData: GiftType[] = Object.values(giftsResponse).map(
      (item: any) => {
        const variant = item.variants.nodes[0];
        const price = dataUtils.formatPrice({
          amount: parseFloat(variant.price.amount),
          currencyCode: variant.price.currencyCode,
        });

        return {
          id: variant.id,
          title: item.title,
          price,
          code: item.code?.value || null,
        } as GiftType;
      }
    );

    const sellingPlansData = sellingPlans.sellingPlanGroups.nodes
      .map((group: any) => {
        const sellingPlans = group.sellingPlans.nodes;
        const discount = sellingPlans[0].name.match(/€(\d+(\.\d{1,2})?)/);

        return {
          sellingPlans,
          name: group.name,
          discount: discount ? parseFloat(discount[1]) : 0,
        };
      })
      .sort(
        (a: SellingPlanGroupType, b: SellingPlanGroupType) =>
          a.discount - b.discount
      );

    return { sellingPlans: sellingPlansData, gifts: giftsData };
  } catch (error) {
    console.log(error);

    return null;
  }
};
