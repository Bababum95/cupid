import { priceFragment } from "@/graphql";

export const cartFragment = `
fragment CartFragment on Cart {
  id
  checkoutUrl
  discountCodes {
    code
  }
  lines(first: 10) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          ...PriceFragment
        }
        amountPerQuantity {
          ...PriceFragment
        }
        compareAtAmountPerQuantity {
          ...PriceFragment
        }
      }
      discountAllocations {
        ... on CartAutomaticDiscountAllocation {
          __typename
          title
        }
      }
      sellingPlanAllocation {
        sellingPlan {
          id
          name
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          product {
            title
            description
            handle
          }
          price {
            ...PriceFragment
          }
          compareAtPrice {
            ...PriceFragment
          }
          image {
            url
          }
        }
      }
    }
  }
  cost {
    totalAmount {
      amount
      currencyCode
    }
  }
}
${priceFragment}
`;
