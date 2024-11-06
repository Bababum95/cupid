import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  type ShopifyPageViewPayload,
} from "@shopify/hydrogen-react";

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

export function sendPageView() {
  const payload: ShopifyPageViewPayload = {
    shopId: process.env.SHOPIFY_SHOP_ID as string,
    currency: "USD",
    hasUserConsent: true,
    ...getClientBrowserParameters(),
  };

  sendShopifyAnalytics({
    eventName: AnalyticsEventName.PAGE_VIEW,
    payload,
  });
}
