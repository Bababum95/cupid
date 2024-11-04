import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";

import { default as Logotype } from "@/icons/logotype.svg";

import styles from "./Header.module.scss";

const Menu = dynamic(() => import("@/components/dynamic/Menu"), {
  ssr: false,
});

export const Header = () => {
  const t = useTranslations("HomePage");

  return (
    <header className={styles.header}>
      <Menu />
      <Link href="/" className={styles.logo}>
        <Logotype width={60} />
      </Link>
      <nav className={styles.nav}>
        {["ingredients", "reviews", "faq"].map((link) => (
          <Link key={link} href={`/#${link}`}>
            {t(link)}
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
