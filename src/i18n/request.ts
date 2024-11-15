import { getRequestConfig } from "next-intl/server";

import { routing, LocaleType } from "./routing";

import { DEFAULLT_LOCALE } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as LocaleType)) {
    return {
      messages: (await import(`./messages/${DEFAULLT_LOCALE}.json`)).default,
    };
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
