export const sellingPlansFragment = `
fragment SellingPlansFragment on Product {
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
}`;