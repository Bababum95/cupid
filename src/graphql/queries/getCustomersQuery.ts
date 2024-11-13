import { customerFragment } from "@/graphql";

export const getCustomersQuery = `
  query GetCustomersQuery($first: Int = 1, $query: String) {
    customers(first: $first, query: $query) {
      nodes {
        ...CustomerFragment
      }
    }
  }
${customerFragment}
`;
