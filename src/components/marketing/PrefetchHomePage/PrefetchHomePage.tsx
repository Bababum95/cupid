"use client";

import { FC, useEffect } from "react";

import { useRouter } from "@/i18n/routing";

export const PrefetchHomePage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  return null;
};
