import Link from "next/link";
import dynamic from "next/dynamic";

import { default as Logotype } from "@/icons/logotype.svg";

import styles from "./Header.module.scss";

const Menu = dynamic(() => import("@/components/dynamic/Menu"), {
  ssr: false,
});
const LangSwitcher = dynamic(
  () => import("@/components/dynamic/PopupLangSwitcher"),
  {
    ssr: false,
  }
);

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
