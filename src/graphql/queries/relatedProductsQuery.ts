import { productFragment } from "@/graphql";

export const relatedProductsQuery = `
query RelatedProductsQuery($withMetafields: Boolean = true) {
  chocolate: product(handle: "cupid-chocolate") {
    ...ProductFragment
  }
  crossSells: collection(handle: "cross-sells") {
    products(first: 10) {
      nodes {
        ...ProductFragment
      }
    }
  }
  gifts: collection(handle: "sex-chocolate") {
    metafield(key: "gifts", namespace: "collection") {
      value
    }
  }
}
${productFragment}
`;
