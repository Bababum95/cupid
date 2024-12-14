"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Accordion } from "@/components";
import EyeIcon from "@/icons/eye.svg";

import { DEFAULT_LENGTH, LIST_OF_QUESTIONS } from "./config";
import styles from "./FAQ.module.scss";

const maxLength = LIST_OF_QUESTIONS.length;

export const FAQ: FC = () => {
  const [length, setLength] = useState(DEFAULT_LENGTH);
  const t = useTranslations("FAQ");
  const listTranslations = useTranslations("FAQ.list");

  return (
    <section id="faq" className={styles.section}>
      <h2 className={styles.title}>{t("title")}</h2>
      <div className={styles.wrapper}>
        <div className={styles.accordion}>
          <Accordion
            t={listTranslations}
            data={LIST_OF_QUESTIONS.slice(0, length)}
          />
          {length < maxLength && (
            <button
              className={styles.button}
              onClick={() => setLength(maxLength)}
            >
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
