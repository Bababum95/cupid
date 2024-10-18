export const CollectionQuery = `
query collectionQuery($handle: String) {
  collection(handle: $handle) {
    products(first: 5) {
      edges {
        node {
          handle
          id
          title
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 3) {
            edges {
              node {
                components(first: 3) {
                  edges {
                    node {
                      quantity
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    metafield(key: "gifts", namespace: "collection") {
      value
    }
  }
}`;
