export const collectionQuery = `
query CollectionQuery($handle: String, $includeImages: Boolean = false) {
  collection(handle: $handle) {
    products(first: 10) {
      nodes {
        ...ProductFragment
      }
    }
    metafield(key: "gifts", namespace: "collection") {
      value
    }
  }
}`;
