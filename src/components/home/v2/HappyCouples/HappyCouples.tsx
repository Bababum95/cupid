"use client";
import { useTranslations } from "next-intl";

import styles from "./HappyCouples.module.scss";
import classNames from "classnames";

export const HappyCouples = () => {
  const t = useTranslations("HomePage.V2");
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        {t("happy-couples", { amount: "1,000" })}
      </h2>
      <div className={styles.images}>
        <div className={styles.row}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.image} />
          ))}
        </div>
        <div className={styles.row}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.image} />
          ))}
        </div>
      </div>
      <div className={classNames(styles.images, styles.mobile)}>
        <div className={styles.row}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.image} />
          ))}
        </div>
        <div className={styles.row}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.image} />
          ))}
        </div>
      </div>
    </div>
  );
};
