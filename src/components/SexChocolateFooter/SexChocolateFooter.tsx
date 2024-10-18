"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { details } from "./config";
import styles from "./SexChocolateFooter.module.scss";

export const SexChocolateFooter: FC = () => {
  const t = useTranslations("SexChocolate");

  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("why-cupid")}</h2>
          <div className={styles.actions}>
            <button className={styles.button}>{t("product-benefits")}</button>
            <button className={styles.button}>{t("supplemen-facts")}</button>
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
      </div>
    </footer>
  );
};
