export const productQuery = `
query ProductQuery($handle: String) {
  product(handle: $handle) {
    id
    title
    handle
    variants(first: 3) {
      edges {
        node {
          id
          title
          image {
            url
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`;

export const sellingPlansQuery = `
query ProductQuery($handle: String) {
  product(handle: $handle) {
    sellingPlanGroups(first: 3) {
      nodes {
        name
        sellingPlans(first: 5) {
          nodes {
            name
            id
            options {
              value
              name
            }
          }
        }
      }
    }
  }
}
`;

export const buildProductsQuery = (ids: string[]): string => {
  return `
    query getProducts {
      ${ids
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
        .join("\n")}
    }
  `;
};
