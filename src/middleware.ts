import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

// const variants = ["1", "2"] as const;
// const getRandomVariant = () =>
//   variants[Math.floor(Math.random() * variants.length)];

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/de") {
    const cookiesVariant = request.cookies.get("variant")?.value;
    const urlVariant = request.nextUrl.searchParams.get("v");
    const currentVariant = urlVariant || cookiesVariant || "1";
    let redirect = false;

    if (cookiesVariant !== urlVariant || urlVariant === "1") {
      redirect = true;
    }

    if (cookiesVariant === "1" && !urlVariant) {
      redirect = false;
    }

    if (redirect) {
      const variant = currentVariant === "1" ? "/" : `/?v=${currentVariant}`;
      const response = NextResponse.redirect(new URL(variant, request.url));

      response.cookies.set("variant", currentVariant, {
        path: "/",
        httpOnly: true,
        secure: true,
      });

      return response;
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
