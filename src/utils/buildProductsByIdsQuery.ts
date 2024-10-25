export const buildProductsByIdsQuery = (ids: string[]): string => {
  return ids
    .map((id, index) => {
      return `
          product_${index}: product(id: "${id}") {
            id
            title
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        `;
    })
    .join("\n");
};
