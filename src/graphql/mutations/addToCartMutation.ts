import { cartFragment } from "@/graphql";

export const addToCartMutation = `
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
  }
}
${cartFragment}
`;
