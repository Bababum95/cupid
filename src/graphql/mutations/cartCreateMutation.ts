import { cartFragment } from "@/graphql";

export const cartCreateMutation = `
mutation CartCreateMutation($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      ...CartFragment
    }
    userErrors {
      field
      message
    }
    warnings {
      code
      message
      target
    }
  }
}
${cartFragment}
`;
