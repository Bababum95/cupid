import {
  PriceNode,
  Price,
  ProductNode,
  ProductType,
  UnitPriceMeasurementType,
  GiftType,
  GiftsResponse,
} from "@/types";

export const dataUtils = {
  normalizePrice: <T extends PriceNode | null>(data: T) => {
    if (!data) return null as T extends null ? null : Price;

    return {
      amount: parseFloat(data.amount),
      currencyCode: data.currencyCode,
    } as Price;
  },

  formatGift: (data: GiftsResponse) => {
    return Object.values(data).map((item) => {
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
        description: item.description,
        image: item.featuredImage,
      } as GiftType;
    });
  },

  normalizeProduct: (productNode: ProductNode): ProductType => {
    const parse = (data: { value: string } | null | undefined) => {
      if (!data) return null;
      return JSON.parse(data.value);
    };

    return {
      title: productNode.title,
      description: productNode.description,
      bage: productNode.bage?.value,
      featuredImage: productNode.featuredImage,
      ingredients: parse(productNode.ingredients),
      "product-details": parse(productNode.details),
      "how-to-use": parse(productNode.how_to_use),
      variants: productNode.variants.nodes.map((variant) => {
        return {
          id: variant.id,
          title: variant.title,
          description: variant.description?.value || null,
          image: variant.image,
          components: variant.components.nodes,
          price: dataUtils.normalizePrice(variant.price),
          compareAtPrice: dataUtils.normalizePrice(variant.compareAtPrice),
          unitPriceMeasurement:
            variant.unitPriceMeasurement &&
            variant.unitPriceMeasurement.quantityValue &&
            variant.unitPriceMeasurement.referenceValue
              ? variant.unitPriceMeasurement
              : null,
        };
      }),
    };
  },

  formatPrice: <T extends Price | null>(data: T, minimumFractionDigits = 2) => {
    if (!data) return null as T extends null ? null : string;
    return data.amount.toLocaleString("de-DE", {
      style: "currency",
      currency: data.currencyCode,
      currencyDisplay: "symbol",
      minimumFractionDigits,
      maximumFractionDigits: 2,
    }) as string;
  },

  calculateUnitPrice: ({
    unitPriceMeasurement,
    price,
  }: {
    unitPriceMeasurement: UnitPriceMeasurementType | null;
    price: Price;
  }) => {
    if (!unitPriceMeasurement) return null;

    const {
      measuredType,
      quantityValue,
      quantityUnit,
      referenceValue,
      referenceUnit,
    } = unitPriceMeasurement;
    switch (measuredType) {
      case "WEIGHT":
        const quVal =
          quantityUnit === "KG" ? quantityValue * 1000 : quantityValue;
        const refVal =
          referenceUnit === "KG" ? referenceValue * 1000 : referenceValue;

        return dataUtils.formatPrice({
          amount: (refVal / quVal) * price.amount,
          currencyCode: price.currencyCode,
        });
      default:
        return null;
    }
  },

  /**
   * Splits a string into an array by a specified delimiter and limits the result to a maximum number of elements.
   * If no delimiter is found, returns an array with the original string as its only element.
   *
   * @param {string} str - The input string to split.
   * @param {object} [options] - Optional settings for the split operation.
   * @param {number} [options.limit=2] - Maximum number of elements in the resulting array (default is 2).
   * @param {string} [options.delimiter=","] - Delimiter used to split the string (default is ",").
   * @returns {string[]} - The resulting array with at most the specified number of elements.
   */
  splitStringWithLimit: (
    str: string,
    options?: { limit?: number; delimiter?: string }
  ): string[] => {
    const { limit = 2, delimiter = "," } = options || {};

    // Split the string by the specified delimiter and limit the result
    const result = str.split(delimiter).slice(0, limit);

    // Return the resulting array
    return result;
  },
};
