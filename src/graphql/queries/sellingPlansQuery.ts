export const sellingPlansQuery = `
query SellingPlansQuery($handle: String) {
  product(handle: $handle) {
    sellingPlanGroups(first: 3) {
      nodes {
        name
        sellingPlans(first: 5) {
          nodes {
            name
            id
            options {
              value
              name
            }
          }
        }
      }
    }
  }
}
`;
