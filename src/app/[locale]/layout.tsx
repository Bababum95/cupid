import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages } from "next-intl/server";
import Script from "next/script";

import "@/styles/globals.scss";

import { SCHEMA_MARKUP } from "./config";
import StoreProvider from "./StoreProvider";

const PUBLIC_GA_ID = process.env.PUBLIC_GA_ID;

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
      {PUBLIC_GA_ID && (
        <>
          {/* Load Google Analytics script asynchronously */}
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`}
          />

          {/* Initialize Google Analytics with the provided ID */}
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${PUBLIC_GA_ID}');
              `,
            }}
          />
        </>
      )}

      <body className="body">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>{children}</StoreProvider>
        </NextIntlClientProvider>

        {/* JSON-LD Schema Data */}
        {SCHEMA_MARKUP.map((ld, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
      </body>
    </html>
  );
}
