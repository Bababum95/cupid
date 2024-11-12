"use client";

import Script from "next/script";
import { useEffect, type FC } from "react";
import { useRouter } from "next/router";

/**
 * Props for GoogleAnalytics component
 * @property {string} id - Google Analytics measurement ID
 */
type Props = {
  id: string;
};

/**
 * GoogleAnalytics component for initializing and configuring Google Analytics
 * with page route tracking in a Next.js application.
 *
 * @param {Props} props - Props object containing the Google Analytics ID.
 * @returns {JSX.Element} JSX element containing the Google Analytics Script tags.
 */
const GoogleAnalytics: FC<Props> = ({ id }) => {
  const router = useRouter();

  useEffect(() => {
    /**
     * Handles route change events by sending page path to Google Analytics
     * @param {string} url - The URL of the new route.
     */
    const handleRouteChange = (url: string) => {
      window.gtag("config", id, { page_path: url });
    };

    // Subscribe to route changes and handle them with handleRouteChange
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      // Cleanup the event listener on component unmount
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, id]);

  return (
    <>
      {/* Load Google Analytics script asynchronously */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />

      {/* Initialize Google Analytics with the provided ID */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
