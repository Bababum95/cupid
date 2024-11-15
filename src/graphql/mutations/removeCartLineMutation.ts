import { cartFragment } from "@/graphql";

export const removeCartLineMutation = `
mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $discountCodes: [String!]) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
