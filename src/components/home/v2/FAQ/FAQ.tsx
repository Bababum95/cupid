"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Accordion } from "@/components";
import PlusIcon from "@/icons/plus.svg";

import styles from "./FAQ.module.scss";
import { EXPERTS, LIST_OF_QUESTIONS } from "./config";

export const FAQ: FC = () => {
  const t = useTranslations("HomePage.FAQ");
  const listTranslations = useTranslations("FAQ.list");

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t("title")}</h2>
        <div className={styles.experts}>
          {EXPERTS.map((src, index) => (
            <Image
              src={src}
              alt={`expert-${index}`}
              width={50}
              height={50}
              key={index}
              className={styles.expert}
            />
          ))}
        </div>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </div>
      <div className={styles.accordion}>
        <Accordion t={listTranslations} Icon={PlusIcon} data={LIST_OF_QUESTIONS} />
      </div>
    </section>
  );
};
