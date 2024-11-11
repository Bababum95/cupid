import { NextResponse } from "next/server";

import { customerCreateMutation, getCustomersQuery } from "@/graphql";
import { fetchShopifyAdmin } from "@/lib/shopify";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const variables = {
    input: {
      email,
      emailMarketingConsent: {
        marketingState: "SUBSCRIBED",
        marketingOptInLevel: "SINGLE_OPT_IN",
        consentUpdatedAt: new Date().toISOString(),
      },
    },
  };

  try {
    const users = await fetchShopifyAdmin({
      query: getCustomersQuery,
      variables: { query: email },
    });

    return NextResponse.json(users, { status: 200 });

    const result = await fetchShopifyAdmin({
      query: customerCreateMutation,
      variables,
    });

    if (result.errors) {
      return NextResponse.json(
        { message: "Internal Server Error!", errors: result.errors },
        { status: 500 }
      );
    }

    const { userErrors } = result.data.customerCreate;

    if (userErrors.length > 0) {
      return NextResponse.json(
        { message: userErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
