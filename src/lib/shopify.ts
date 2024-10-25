import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_DOMEN as string,
  apiVersion: "2024-10",
  publicAccessToken: process.env.SHOPIFY_PUBLIC_TOKEN as string,
});

type FetchShopifyParams = {
  query: string;
  variables?: Record<string, unknown>;
};

export async function fetchShopify({ query, variables }: FetchShopifyParams) {
  const cleanQuery = query.replace(/\s+/g, " ").trim();
  const response = await client.request(cleanQuery, {
    variables,
  });

  return response.data;
}
