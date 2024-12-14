"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Accordion } from "@/components";

import { FAQ_DATA } from "./config";
import styles from "./Content.module.scss";

export const Content: FC = () => {
  const t = useTranslations("FAQ");
  const listTranslations = useTranslations("FAQ.list");

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("page-title")}</h1>
        </div>
        <Image
          src="/images/chocolate.jpg"
          alt="Romantic Couple Sharing Chocolate"
          width={1440}
          height={440}
          priority
          className={styles.image}
          quality={90}
        />
      </div>
      {FAQ_DATA.map(({ category, list }) => (
        <section key={category} className={styles.section}>
          <h2 className={styles.title}>{t(category)}</h2>
          <div className={styles.accordion}>
            <Accordion t={listTranslations} data={list} />
          </div>
        </section>
      ))}
    </div>
  );
};
