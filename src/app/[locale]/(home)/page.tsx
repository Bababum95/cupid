import { cookies } from "next/headers";

import { Header, Footer, InitialLangSwitcher } from "@/components";
import { DEFAULLT_LOCALE } from "@/i18n/config";

import PageV1 from "./v1/page";
import PageV2 from "./v2/page";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const cookieStore = cookies();

  return (
    <>
      {!cookieStore.has("LS") && locale === DEFAULLT_LOCALE && (
        <InitialLangSwitcher />
      )}
      <Header />
      {cookieStore.get("variant")?.value === "2" ? <PageV2 /> : <PageV1 />}
      <Footer />
    </>
  );
}
