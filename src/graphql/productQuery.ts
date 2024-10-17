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



export const IntrospectionQuery = `
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      name
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
}`;
export const productComponentsQuery = `
query ProductComponentsQuery($productId: ID) {
  product(id: $productId) {
    id
    productComponents(first: 10) {
      totalCount
      edges {
        cursor
        node {
          product {
            id
            title
            featuredImage {
              id
              url
              altText
            }
            totalVariants
          }
          componentVariantsCount {
            count
          }
          nonComponentVariantsCount {
            count
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`;
