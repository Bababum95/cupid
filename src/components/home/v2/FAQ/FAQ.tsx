"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Accordion } from "@/components";
import PlusIcon from "@/icons/plus.svg";

import styles from "./FAQ.module.scss";
import { EXPERTS } from "./config";

export const FAQ: FC = () => {
  const t = useTranslations("HomePage.V2.FAQ");
  const faq = useTranslations("HomePage.FAQ");

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
        <Accordion
          t={faq}
          Icon={PlusIcon}
          data={Array.from({ length: 6 }, (_, i) => `list.${i}`.toString())}
        />
      </div>
    </section>
  );
};
