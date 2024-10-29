"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { Accordion } from "@/components";

import { listOfBenefits } from "./config";
import styles from "./BenefitsDrawerContent.module.scss";

export const BenefitsDrawerContent: FC = () => {
  const t = useTranslations("BenefitsDrawerContent");

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        <strong className={styles.label}>
          {t("ignite-passion-and-performance")}:
        </strong>{" "}
        {t("ignite-passion-and-performance-text")}
      </p>
      <Accordion data={listOfBenefits} t={t} />
    </div>
  );
};
