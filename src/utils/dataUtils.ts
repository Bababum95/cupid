import {
  PriceNode,
  Price,
  ProductNode,
  ProductType,
  UnitPriceMeasurementType,
} from "@/types";

export const dataUtils = {
  normalizePrice: <T extends PriceNode | null>(data: T) => {
    if (!data) return null as T extends null ? null : Price;

    return {
      amount: parseFloat(data.amount),
      currencyCode: data.currencyCode,
    } as Price;
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
};
