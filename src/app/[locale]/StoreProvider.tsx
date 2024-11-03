"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { useShopifyCookies } from "@shopify/hydrogen-react";

import { makeStore, AppStore } from "@/lib/store";
import { sendPageView } from "@/lib/shopify";

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
    sendPageView();
  }, [pathname, searchParams]);

  useShopifyCookies({ hasUserConsent: true });

  return <Provider store={storeRef.current}>{children}</Provider>;
}
