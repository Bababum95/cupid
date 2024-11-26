"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { Link } from "@/i18n/routing";
import MenuIcon from "@/icons/menu.svg";

import styles from "./Menu.module.scss";

const SideDrawer = dynamic(() => import("@/components/dynamic/SideDrawer"), {
  ssr: false,
});
const WHATSAPP_URI = process.env.WHATSAPP_URI;

export const Menu = () => {
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

      <SideDrawer isOpen={isOpen} onClose={close} side="left">
        <nav className={styles.nav}>
          <Link className={styles.link} href="/sex-chocolate">
            {t("by-now")}
          </Link>
          <span className={styles.divider} />
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
          <span className={styles.divider} />
          <a
            className={styles.link}
            href={WHATSAPP_URI}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            WhatsApp
          </a>
        </nav>
      </SideDrawer>
    </>
  );
};
