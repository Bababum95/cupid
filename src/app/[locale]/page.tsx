import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/home";

import styles from "./page.module.scss";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1>{t("title")}</h1>
        <Image
          src="/images/preview.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={1440}
          height={860}
          className={styles.preview}
        />
        <Link href="/sex-chocolate">{t("by-now")}</Link>
      </main>
    </>
  );
}
