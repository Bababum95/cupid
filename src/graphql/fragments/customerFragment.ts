export const customerFragment = `
fragment CustomerFragment on Customer {
    id
    email
    emailMarketingConsent {
        marketingState
    }
}
`;
