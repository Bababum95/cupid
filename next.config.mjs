import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_DOMEN: process.env.SHOPIFY_DOMEN,
    SHOPIFY_PUBLIC_TOKEN: process.env.SHOPIFY_PUBLIC_TOKEN,
    SHOPIFY_SHOP_ID: process.env.SHOPIFY_SHOP_ID,
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
