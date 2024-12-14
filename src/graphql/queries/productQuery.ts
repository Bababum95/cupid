import { productFragment } from "@/graphql";

export const productQuery = `
query ProductQuery($handle: String, $withMetafields: Boolean = true) {
  product(handle: $handle) {
    ...ProductFragment
  }
}
${productFragment}
`;
