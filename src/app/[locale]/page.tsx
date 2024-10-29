import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Header, Advantages, FAQ, Ingredients } from "@/components/home";

import styles from "./page.module.scss";
import classNames from "classnames";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <>
      <Header />
      <main className={styles.page}>
        <Image
          src="/images/preview.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={1440}
          height={860}
          className={styles.image}
          priority
        />
        <div className={styles.content}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.text}>
            <span>{t("ignite-passion")}</span>
            {t("naturally")}
            <span>{t("enhancing-intimacy")}</span>
            {t("connection")}
            <span>{t("every-bite")}</span>
          </p>
          <Link href="/sex-chocolate" className={styles.button}>
            {t("by-now")}
          </Link>
        </div>
        <Advantages />
        <Ingredients />
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={1440}
          height={600}
          className={classNames(styles.image, styles.chocolate)}
        />
        <FAQ />
      </main>
    </>
  );
}
