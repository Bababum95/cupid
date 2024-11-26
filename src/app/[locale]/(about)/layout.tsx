import { cookies } from "next/headers";

import {
  Subscribe,
  Header,
  Footer,
  LangSwitcher,
  Intercom,
} from "@/components";
import { Wrapper } from "@/components/about";
import { DEFAULLT_LOCALE } from "@/i18n/config";

export default function AboutLayout({
  children,
  params: { locale },
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  return (
    <>
      {!cookieStore.has("LS") && locale === DEFAULLT_LOCALE && <LangSwitcher />}
      <Header />
      <main>
        <Wrapper>{children}</Wrapper>
        <Subscribe />
      </main>
      <Footer />
      <Intercom />
    </>
  );
}
