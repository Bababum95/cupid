import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";

import "@/styles/globals.scss";

import StoreProvider from "./StoreProvider";

const PUBLIC_GA_ID = process.env.PUBLIC_GA_ID;
const PUBLIC_GTM_ID = process.env.PUBLIC_GTM_ID;
const BASE_DOMAIN = process.env.BASE_DOMAIN;
const CHECKOUT_DOMAIN = process.env.CHECKOUT_DOMAIN;

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
            strategy="afterInteractive"
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`}
          />

          {/* Initialize Google Analytics with the provided ID */}
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            defer
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", "${PUBLIC_GA_ID}", {
                  linker: { domains: ["${BASE_DOMAIN}", "${CHECKOUT_DOMAIN}"] }
                });
              `,
            }}
          />
        </>
      )}

      {PUBLIC_GTM_ID && (
        <>
          {/* Google Tag Manager Script */}
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${PUBLIC_GTM_ID}');
              `,
            }}
          />
        </>
      )}

      <body className="body">
        {PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>{children}</StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
