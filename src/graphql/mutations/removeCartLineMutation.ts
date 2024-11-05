import { cartFragment } from "@/graphql";

export const removeCartLineMutation = `
mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...CartFragment
    }
  }
}
${cartFragment}
`;
