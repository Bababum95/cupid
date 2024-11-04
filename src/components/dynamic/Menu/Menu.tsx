"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ReactDOM from "react-dom";
import Link from "next/link";

import { SideDrawer } from "@/components";
import MenuIcon from "@/icons/menu.svg";

import styles from "./Menu.module.scss";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("HomePage");

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>
      {ReactDOM.createPortal(
        <SideDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          side="left"
        >
          <nav className={styles.nav}>
            <Link className={styles.link} href="#">
              {t("orders")}
            </Link>
            <span className={styles.divider} />
            {["ingredients", "reviews", "faq"].map((link) => (
              <Link key={link} href={`/#${link}`} className={styles.link}>
                {t(link)}
              </Link>
            ))}
          </nav>
        </SideDrawer>,
        document.body
      )}
    </>
  );
}
