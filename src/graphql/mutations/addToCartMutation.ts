import { cartFragment } from "@/graphql";

export const addToCartMutation = `
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $discountCodes: [String!]) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
  }
  cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
    userErrors {
      field
      message
    }
  }
}
${cartFragment}
`;
