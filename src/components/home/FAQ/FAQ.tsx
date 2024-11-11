"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Accordion } from "@/components";
import EyeIcon from "@/icons/eye.svg";

import styles from "./FAQ.module.scss";

export const FAQ: FC = () => {
  const [length, setLength] = useState(6);
  const t = useTranslations("FAQ");

  return (
    <section id="faq" className={styles.section}>
      <h2 className={styles.title}>{t("title")}</h2>
      <div className={styles.wrapper}>
        <div className={styles.accordion}>
          <Accordion
            t={t}
            data={Array.from({ length }, (_, i) => (i + 1).toString())}
          />
          {length < 19 && (
            <button className={styles.button} onClick={() => setLength(19)}>
              <span>{t("show-more")}</span>
              <span className={styles.icon}>
                <span className={styles.dots} />
                <EyeIcon />
              </span>
            </button>
          )}
        </div>
        <Image
          width={650}
          height={582}
          alt="Cupid Aphrodisiac Chocolate"
          src="/images/FAQ.jpg"
          className={styles.image}
        />
      </div>
    </section>
  );
};
