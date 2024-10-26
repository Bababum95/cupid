import { useTranslations } from "next-intl";
import Link from "next/link";

import { default as Logotype } from "@/icons/logotype.svg";

import styles from "./Header.module.scss";

const sections = ["ingredients", "reviews", "faq"] as const;

export const Header = () => {
  const t = useTranslations("HomePage");

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Logotype width={60} />
      </Link>
      <nav className={styles.nav}>
        {sections.map((section) => (
          <Link key={section} href={`#${section}`}>
            {t(section)}
          </Link>
        ))}
      </nav>
      <div className={styles.end}>
        <Link className={styles.button} href="/sex-chocolate">
          {t("by-now")}
        </Link>
      </div>
    </header>
  );
};
