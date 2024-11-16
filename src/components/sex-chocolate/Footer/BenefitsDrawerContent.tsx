"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { Accordion } from "@/components";

import styles from "./BenefitsDrawerContent.module.scss";

export const BenefitsDrawerContent: FC = () => {
  const t = useTranslations("SexChocolate.BenefitsDrawerContent");

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        {t.rich("text", {
          strong: (chunks) => (
            <strong className={styles.label}>{chunks}</strong>
          ),
        })}
      </p>
      <Accordion
        data={Array.from({ length: 6 }, (_, i) => `list.${i}`)}
        t={t}
      />
    </div>
  );
};
