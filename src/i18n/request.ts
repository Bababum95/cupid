import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
// import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    return {
      messages: (await import(`./messages/en.json`)).default,
    };
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
