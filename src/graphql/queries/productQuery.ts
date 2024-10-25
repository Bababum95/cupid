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

