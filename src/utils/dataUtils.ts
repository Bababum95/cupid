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

  /**
   * Formats a given ISO 8601 date string into the format `DD/MM/YYYY`.
   *
   * @param isoDate - A valid ISO 8601 date string (e.g., "2024-11-01T00:00:00.000Z").
   * @returns A string representing the date in the format `DD/MM/YYYY` (e.g., "01/11/2024").
   *
   * @example
   * ```typescript
   * const formattedDate = formatDateIntl("2024-11-01T00:00:00.000Z");
   * console.log(formattedDate); // Output: "01/11/2024"
   * ```
   */
  formatDateIntl: (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB").format(date);
  },

  getShippingDate: (): {
    date: Date;
    hours: number;
    minutes: number;
    day: number;
  } => {
    const now = new Date();
    const currentTime = new Date(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(now)
    );

    const targetTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      15,
      0,
      0
    );

    if (currentTime.getDay() === 0) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const currentTimeMs = currentTime.getTime();
    const targetTimeMs = targetTime.getTime();
    let timeDifference = targetTimeMs - currentTimeMs;

    if (timeDifference < 0) {
      if (currentTime.getDay() === 6) {
        targetTime.setDate(targetTime.getDate() + 2);
      } else {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      timeDifference = targetTime.getTime() - currentTimeMs;
    }

    const day = targetTime.getDay() - currentTime.getDay();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return {
      date: targetTime,
      day,
      hours,
      minutes,
    };
  },
};
