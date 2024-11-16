import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_DOMEN: process.env.SHOPIFY_DOMEN,
    SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION || "2024-10",
    SHOPIFY_PUBLIC_TOKEN: process.env.SHOPIFY_PUBLIC_TOKEN,
    SHOPIFY_SHOP_ID: process.env.SHOPIFY_SHOP_ID,
    IS_VERCEL: process.env.IS_VERCEL === "true" ? "true" : "false",
    PUBLIC_GA_ID: process.env.PUBLIC_GA_ID,
    PUBLIC_GTM_ID: process.env.PUBLIC_GTM_ID,
    INTERCOM_APP_ID: process.env.INTERCOM_APP_ID,
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
    prependData: `@import "/src/styles/mixins", "/src/styles/variables";`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
