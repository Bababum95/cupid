"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { useShopifyCookies } from "@shopify/hydrogen-react";
import * as CookieConsent from "vanilla-cookieconsent";
import {
  Intercom,
  shutdown as IntercomShutdown,
} from "@intercom/messenger-js-sdk";

import "vanilla-cookieconsent/dist/cookieconsent.css";

import { makeStore, AppStore } from "@/lib/store";
import { sendPageView } from "@/lib/shopify";

import { COOKIE_CONSENT_CONFIG, HIDE_INTERCOM_PATHS } from "./config";

const PUBLIC_GA_ID = process.env.PUBLIC_GA_ID;
const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID;

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
  }, []);

  useEffect(() => {
    if (PUBLIC_GA_ID) {
      window.gtag("config", PUBLIC_GA_ID, { page_path: pathname });
    }
    if (INTERCOM_APP_ID) {
      if (HIDE_INTERCOM_PATHS.includes(pathname)) {
        IntercomShutdown();
      } else {
        window.Intercom?.("boot", { app_id: INTERCOM_APP_ID });
      }
    }
    sendPageView();
  }, [pathname, searchParams]);

  useShopifyCookies({ hasUserConsent: true });

  return <Provider store={storeRef.current}>{children}</Provider>;
}
