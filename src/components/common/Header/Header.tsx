import { useTranslations } from "next-intl";

import { Menu, LangSwitcher } from "@/components";
import { Link } from "@/i18n/routing";
import { default as Logotype } from "@/icons/logotype.svg";

import styles from "./Header.module.scss";

export const Header = () => {
  const t = useTranslations("HomePage");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Menu />
        <Link href="/" className={styles.logo}>
          <Logotype width={60} />
        </Link>
        <nav className={styles.nav}>
          <Link href="/#ingredients">{t("ingredients")}</Link>
          <Link href="/#reviews">{t("reviews")}</Link>
          <Link href="/faq">{t("faq")}</Link>
        </nav>
        <div className={styles.end}>
          <LangSwitcher />
          <Link className={styles.button} href="/sex-chocolate">
            {t("by-now")}
          </Link>
        </div>
      </div>
    </header>
  );
};
