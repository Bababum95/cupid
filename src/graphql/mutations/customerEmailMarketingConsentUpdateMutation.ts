import { customerFragment } from "../fragments/customerFragment";

export const customerEmailMarketingConsentUpdateMutation = `
mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
  customerEmailMarketingConsentUpdate(input: $input) {
    customer {
      ...CustomerFragment
    }
    userErrors {
      field
      message
    }
  }
}
${customerFragment}
`;
