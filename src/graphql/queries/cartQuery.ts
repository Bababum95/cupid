import { cartFragment } from "@/graphql";

export const cartQuery = `
query CartQuery($cartId: ID!) {
  cart(id: $cartId) {
    ...CartFragment
  }
}
${cartFragment}
`;
