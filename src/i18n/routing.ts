import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { DEFAULLT_LOCALE, LOCALES } from "./config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,
  localePrefix: "as-needed",
  defaultLocale: DEFAULLT_LOCALE,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
