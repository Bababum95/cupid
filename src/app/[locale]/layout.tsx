import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "@/styles/globals.scss";

import {
  BREADCRUMB_JSON_LD,
  LOCAL_BUSINESS_JSON_LD,
  ORGANIZATION_JSON_LD,
  PRODUCT_JSON_LD,
  WEBSITE_JSON_LD,
} from "./config";
import StoreProvider from "./StoreProvider";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    applicationName: "Cupid",
    alternates: {
      canonical: "https://cupidchoco.com/",
      languages: { de: "https://cupidchoco.com/de" },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: "Cupid",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Cupid_cover_img.jpg",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      site: "@cupid_choco",
      creator: "@cupid_choco_de",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Cupid_cover_img.jpg",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="body">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>{children}</StoreProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PRODUCT_JSON_LD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_JSON_LD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(BREADCRUMB_JSON_LD),
          }}
        />
      </body>
    </html>
  );
}
