import { productFragment } from "@/graphql";

export const crossSellsQuery = `
query CrossSellsQuery($withMetafields: Boolean = true) {
  collection(handle: "cross-sells") {
    products(first: 10) {
      nodes {
        ...ProductFragment
      }
    }
  }
}
${productFragment}
`;
