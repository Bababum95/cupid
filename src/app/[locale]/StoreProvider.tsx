"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { useShopifyCookies } from "@shopify/hydrogen-react";
import * as CookieConsent from "vanilla-cookieconsent";
import Intercom from "@intercom/messenger-js-sdk";

import "vanilla-cookieconsent/dist/cookieconsent.css";

import { makeStore, AppStore } from "@/lib/store";
import { sendPageView } from "@/lib/shopify";

import { COOKIE_CONSENT_CONFIG } from "./config";

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
    Intercom({ app_id: "or685gsh" });
  }, []);

  useEffect(() => {
    sendPageView();
  }, [pathname, searchParams]);

  useShopifyCookies({ hasUserConsent: true });

  return <Provider store={storeRef.current}>{children}</Provider>;
}
