import { priceFragment } from "@/graphql";

export const productFragment = `
fragment ProductFragment on Product {
  title
  description
  featuredImage {
    url
  }
  ingredients: metafield(key: "ingredients" namespace: "product") @include(if: $withMetafields) {
    value
  }
  details: metafield(key: "product_details" namespace: "product") @include(if: $withMetafields) {
    value
  }
  how_to_use: metafield(key: "how_to_use" namespace: "product") @include(if: $withMetafields) {
    value
  }
  bage: metafield(key: "bage" namespace: "product") @include(if: $withMetafields) {
    value
  }
  variants(first: 10) {
    nodes {
      id
      title
      price {
        ...PriceFragment
      }
      compareAtPrice {
        ...PriceFragment
      }
      image {
        url
      }
      components(first: 3) {
        nodes {
          quantity
        }
      }
      description: metafield(key: "description" namespace: "variant") {
        value
      }
      unitPriceMeasurement {
        measuredType
        quantityUnit
        quantityValue
        referenceUnit
        referenceValue
      }
    }
  }
}
${priceFragment}
`;
