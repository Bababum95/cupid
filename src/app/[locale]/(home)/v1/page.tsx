import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Subscribe, Header } from "@/components";
import {
  Advantages,
  Comments,
  CupidCommunity,
  FAQ,
  Gallery,
  Ingredients,
  Marquee,
  Recommendations,
  Stars,
} from "@/components/home";

import { MARQUEE_V1 } from "../config";
import styles from "./page.module.scss";

const VERSION = "V1";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.hero}>
          <Image
            src="/images/cupid-chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={860}
            className={styles.image}
            priority
          />
          <div className={styles.content}>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.text}>
              {t.rich("description", {
                span: (chunks) => <span>{chunks}</span>,
              })}
            </p>
            <Link href="/sex-chocolate" className={styles.button}>
              {t("by-now")}
            </Link>
            <Link href="/#reviews" className={styles.stars}>
              <p>
                <span>152</span> {t("verified-5-star-reviews")}
              </p>
              <Stars />
            </Link>
          </div>
        </div>
        <Marquee list={MARQUEE_V1} />
        <Advantages />
        <Recommendations />
        <Ingredients />
        <div className={styles.divider} />
        <CupidCommunity version={VERSION} />
        <Gallery />
        <div className={styles.divider} />
        <Comments />
        <FAQ />
        <Subscribe />
      </main>
    </>
  );
}
