import dynamic from "next/dynamic";

import { dataUtils } from "@/utils";
import { Header } from "@/components";
import { productQuery } from "@/graphql";
import { fetchShopify } from "@/lib/shopify";
import { Comments, Marquee, CupidCommunity } from "@/components/home";
import {
  HowToUse,
  Ingredients,
  ProductDisplay,
  Supergreens,
  Testimonials,
  FAQ,
} from "@/components/home/v2";

import { MARQUEE_V2, LIST_OF_INGREDIENTS } from "../config";
import styles from "./page.module.scss";

const HappyCouples = dynamic(
  () => import("@/components/dynamic/HappyCouples"),
  { ssr: false }
);

export default async function Page({ locale }: { locale: string }) {
  const response = await fetchShopify({
    query: productQuery,
    variables: { handle: "cupid-scented-candle" },
    locale,
  });

  return (
    <>
      <Header byLink="/#product" />
      <main className={styles.page}>
        <Marquee list={MARQUEE_V2} />
        <ProductDisplay
          upsell={dataUtils.normalizeProduct(response?.product)}
          locale={locale}
        />
        <HappyCouples />
        <Supergreens />
        <CupidCommunity />
        <Ingredients list={LIST_OF_INGREDIENTS} />
        <HowToUse />
        <Testimonials />
        <Comments accentColor="#DBAD3A" />
        <FAQ />
      </main>
    </>
  );
}
