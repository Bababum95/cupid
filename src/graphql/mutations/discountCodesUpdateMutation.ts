import { cartFragment } from "@/graphql";

export const discountCodesUpdateMutation = `
mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
  cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
    cart {
      ...CartFragment
    }
  }
}
${cartFragment}
`;
