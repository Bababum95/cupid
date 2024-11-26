import Link from "next/link";

import { Menu, LangSwitcher } from "@/components";
import { default as Logotype } from "@/icons/logotype.svg";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Menu />
        <Link href="/" className={styles.logo}>
          <Logotype width={60} />
        </Link>
        <div className={styles.end}>
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
};
