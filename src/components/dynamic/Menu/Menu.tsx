"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ReactDOM from "react-dom";

import { SideDrawer } from "@/components";
import { Link } from "@/i18n/routing";
import MenuIcon from "@/icons/menu.svg";

import styles from "./Menu.module.scss";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("HomePage");

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>
      {ReactDOM.createPortal(
        <SideDrawer isOpen={isOpen} onClose={close} side="left">
          <nav className={styles.nav}>
            <Link href="/#ingredients" className={styles.link} onClick={close}>
              {t("ingredients")}
            </Link>
            <Link href="/#reviews" className={styles.link} onClick={close}>
              {t("reviews")}
            </Link>
            <Link href="/faq" className={styles.link} onClick={close}>
              {t("faq")}
            </Link>
            <span className={styles.divider} />
            <a
              className={styles.link}
              href="https://my.cupidchoco.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {t("orders")}
            </a>
          </nav>
        </SideDrawer>,
        document.body
      )}
    </>
  );
}
