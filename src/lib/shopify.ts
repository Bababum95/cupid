import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  ShopifySalesChannel,
  type ShopifyPageViewPayload,
} from "@shopify/hydrogen-react";

const SHOPIFY_DOMEN = process.env.SHOPIFY_DOMEN as string;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION as string;

type FetchShopifyParams = {
  query: string;
  variables?: Record<string, unknown>;
  locale?: string;
};

export const client = createStorefrontApiClient({
  storeDomain: SHOPIFY_DOMEN,
  apiVersion: SHOPIFY_API_VERSION,
  publicAccessToken: process.env.SHOPIFY_PUBLIC_TOKEN as string,
});

export async function fetchShopify({
  query,
  variables,
  locale = "en",
}: FetchShopifyParams) {
  const cleanQuery = query.replace(/\s+/g, " ").trim();
  const response = await client.request(cleanQuery, {
    variables,
    headers: {
      "Accept-Language": locale,
    },
  });

  return response.data;
}

export function sendPageView() {
  const payload: ShopifyPageViewPayload = {
    shopId: process.env.SHOPIFY_SHOP_ID as string,
    currency: "USD",
    hasUserConsent: true,
    shopifySalesChannel: ShopifySalesChannel.headless,
    ...getClientBrowserParameters(),
  };

  sendShopifyAnalytics({
    eventName: AnalyticsEventName.PAGE_VIEW,
    payload,
  });
}

export async function fetchShopifyAdmin({
  query,
  variables,
}: FetchShopifyParams) {
  const response = await fetch(
    `https://${SHOPIFY_DOMEN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.SHOPIFY_PRIVATE_TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}
