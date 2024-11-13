import { NextResponse } from "next/server";
import validator from "validator";

import {
  customerCreateMutation,
  getCustomersQuery,
  customerEmailMarketingConsentUpdateMutation,
} from "@/graphql";
import { fetchShopifyAdmin } from "@/lib/shopify";

// Type definitions for Shopify GraphQL responses
type UserError = {
  message: string;
};

type ResultData<T> = {
  errors?: Array<{ message: string }>;
  data: T;
};

type CustomerResponse = {
  customerEmailMarketingConsentUpdate: {
    userErrors: UserError[];
  };
  customerCreate: {
    userErrors: UserError[];
  };
};

// Refactored response handler with type annotations and improved naming
/**
 * Handles the response from Shopify's API and checks for user errors.
 * @param result - The result from the Shopify API containing data and potential errors
 * @param operation - The name of the operation to access data (e.g., "customerCreate" or "customerEmailMarketingConsentUpdate")
 * @returns JSON response with success or error message
 */
const handleShopifyResponse = <T extends keyof CustomerResponse>(
  result: ResultData<CustomerResponse>,
  operation: T
) => {
  if (result.errors) {
    return NextResponse.json(
      { message: { title: "Internal Server Error!" }, errors: result.errors },
      { status: 500 }
    );
  }

  const { userErrors } = result.data[operation];

  if (userErrors.length > 0) {
    return NextResponse.json(
      { message: { title: userErrors[0].message } },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: { title: "Subscription successful" } },
    { status: 200 }
  );
};

// Main handler for POST request
/**
 * Handles the POST request to subscribe a customer to email marketing.
 * Checks if customer exists and updates or creates customer accordingly.
 * @param request - The incoming HTTP request object
 * @returns JSON response indicating subscription status
 */
export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !validator.isEmail(email)) {
    return NextResponse.json(
      { message: { title: "Invalid email" } },
      { status: 400 }
    );
  }

  const emailMarketingConsent = {
    marketingState: "SUBSCRIBED",
    marketingOptInLevel: "SINGLE_OPT_IN",
    consentUpdatedAt: new Date().toISOString(),
  };

  try {
    const { data } = await fetchShopifyAdmin({
      query: getCustomersQuery,
      variables: { query: email },
    });

    const customer = data.customers.nodes[0];

    if (customer?.email === email) {
      if (customer.emailMarketingConsent.marketingState === "SUBSCRIBED") {
        return NextResponse.json(
          { message: { title: "You are already subscribed" } },
          { status: 400 }
        );
      }

      const result = await fetchShopifyAdmin({
        query: customerEmailMarketingConsentUpdateMutation,
        variables: {
          input: { customerId: customer.id, emailMarketingConsent },
        },
      });

      return handleShopifyResponse(
        result,
        "customerEmailMarketingConsentUpdate"
      );
    }

    const result = await fetchShopifyAdmin({
      query: customerCreateMutation,
      variables: { input: { email, emailMarketingConsent } },
    });

    return handleShopifyResponse(result, "customerCreate");
  } catch (error) {
    return NextResponse.json(
      { message: { title: "Internal Server Error" }, error },
      { status: 500 }
    );
  }
}
