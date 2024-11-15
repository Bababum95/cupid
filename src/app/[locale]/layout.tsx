import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";

import "@/styles/globals.scss";

import StoreProvider from "./StoreProvider";

const PUBLIC_GA_ID = process.env.PUBLIC_GA_ID;

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
      </body>
    </html>
  );
}
