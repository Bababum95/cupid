import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
// import { notFound } from "next/navigation";

import { DEFAULLT_LOCALE } from "./config";

export default getRequestConfig(async ({ locale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    return {
      locale: DEFAULLT_LOCALE,
      messages: (await import(`./messages/${DEFAULLT_LOCALE}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
