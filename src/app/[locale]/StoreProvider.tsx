"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { useShopifyCookies } from "@shopify/hydrogen-react";
import * as CookieConsent from "vanilla-cookieconsent";
import { Intercom } from "@intercom/messenger-js-sdk";

import "vanilla-cookieconsent/dist/cookieconsent.css";

import { makeStore, AppStore } from "@/lib/store";
import { sendPageView } from "@/lib/shopify";

import { COOKIE_CONSENT_CONFIG, HIDE_INTERCOM_PATHS } from "./config";

const PUBLIC_GA_ID = process.env.PUBLIC_GA_ID;
const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID;
const BASE_DOMAIN = process.env.BASE_DOMAIN;
const CHECKOUT_DOMAIN = process.env.CHECKOUT_DOMAIN;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {
    document.documentElement.classList.add("cc--elegant-black");
    CookieConsent.run(COOKIE_CONSENT_CONFIG);
    if (INTERCOM_APP_ID) Intercom({ app_id: INTERCOM_APP_ID });

    const referrer = document?.referrer;
    const currentHost = window.location.hostname;
    if (referrer && !referrer.includes(currentHost)) {
      document.cookie = `referrer=${encodeURIComponent(
        referrer
      )}; path=/; max-age=86400;`;
    }
  }, []);

  useEffect(() => {
    if (PUBLIC_GA_ID) {
      window.gtag("config", PUBLIC_GA_ID, {
        page_path: pathname,
        linker: { domains: [BASE_DOMAIN, CHECKOUT_DOMAIN] },
      });
    }

    // Intercom
    if (INTERCOM_APP_ID) {
      try {
        if (HIDE_INTERCOM_PATHS.includes(pathname)) {
          window.Intercom?.("shutdown");
        } else if (!window.Intercom?.("getVisitorId")) {
          window.Intercom?.("boot", { app_id: INTERCOM_APP_ID });
        }
      } catch (error) {
        console.error("Intercom error:", error);
      }
    }
    sendPageView();
  }, [pathname, searchParams]);

  useShopifyCookies({ hasUserConsent: true });

  return <Provider store={storeRef.current}>{children}</Provider>;
}
