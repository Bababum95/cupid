"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { useScrollbarWidth } from "@/hooks";
import { NutritionalDrawerContent, Disclaimer } from "@/components";

import { details } from "./config";
import { BenefitsDrawerContent } from "./BenefitsDrawerContent";
import styles from "./Footer.module.scss";

const SideDrawer = dynamic(() => import("@/components/dynamic/SideDrawer"), {
  ssr: false,
});

export const Footer: FC = () => {
  const [drawer, setDrawer] = useState<
    "product-benefits" | "nutritional-information" | null
  >(null);
  const t = useTranslations("SexChocolate");
  useScrollbarWidth();

  const openDrawer = (name: "product-benefits" | "nutritional-information") => {
    document.body.classList.add("no-scroll");
    setDrawer(name);
  };

  const closeDrawer = () => {
    document.body.classList.remove("no-scroll");
    setDrawer(null);
  };

  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("why-cupid")}</h2>
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() => openDrawer("product-benefits")}
            >
              {t("product-benefits")}
            </button>
            <button
              className={styles.button}
              onClick={() => openDrawer("nutritional-information")}
            >
              {t("supplemen-facts")}
            </button>
          </div>
        </div>
        <ul className={styles.details}>
          {details.map(({ Icon, title, text }) => (
            <li className={styles.detail} key={title}>
              <Icon />
              <div>
                <p className={styles["detail-title"]}>{t(title)}</p>
                <p className={styles["detail-text"]}>{t(text)}</p>
              </div>
            </li>
          ))}
        </ul>
        <Disclaimer />
      </div>
      <SideDrawer
        isOpen={!!drawer}
        onClose={closeDrawer}
        title={drawer ? t(drawer) : ""}
      >
        {drawer === "product-benefits" && <BenefitsDrawerContent />}
        {drawer === "nutritional-information" && <NutritionalDrawerContent />}
      </SideDrawer>
    </footer>
  );
};
