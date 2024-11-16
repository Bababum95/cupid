"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Accordion } from "@/components";

import { FAQ_DATA } from "./config";
import styles from "./Content.module.scss";

export const Content: FC = () => {
  const t = useTranslations("FAQ");

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("title")}</h1>
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
      {FAQ_DATA.map(({ category, count }) => (
        <section key={category} className={styles.section}>
          <h2 className={styles.title}>{t(`list.${category}.title`)}</h2>
          <div className={styles.accordion}>
            <Accordion
              t={t}
              data={Array.from({ length: count }, (_, i) =>
                `list.${category}.${i}`.toString()
              )}
            />
          </div>
        </section>
      ))}
    </div>
  );
};
