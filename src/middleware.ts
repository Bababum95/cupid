import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value;

  if (!locale) {
    request.cookies.set("NEXT_LOCALE", routing.defaultLocale);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)", "/(de|en)/:path*"],
};
