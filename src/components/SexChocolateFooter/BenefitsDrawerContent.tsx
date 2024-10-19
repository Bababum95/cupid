"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

import { listOfBenefits } from "./config";
import styles from "./BenefitsDrawerContent.module.scss";

export const BenefitsDrawerContent: FC = () => {
  const [expanded, setExpanded] = useState<false | number>(false);
  const t = useTranslations("BenefitsDrawerContent");

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        <strong className={styles.label}>
          {t("ignite-passion-and-performance")}:
        </strong>{" "}
        {t("ignite-passion-and-performance-text")}
      </p>
      <ul className={styles.list}>
        {listOfBenefits.map((name, index) => {
          const isOpen = expanded === index;
          return (
            <li
              className={classNames(styles.item, { [styles.open]: isOpen })}
              key={name}
            >
              <div
                className={styles.top}
                onClick={() => setExpanded(isOpen ? false : index)}
              >
                <p className={styles.label}>{t(name)}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={8}
                  height={12}
                  viewBox="0 0 8 12"
                  fill="none"
                >
                  <path
                    d="M7 1L2 6L7 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    className={styles.text}
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto", marginTop: 8 },
                      collapsed: { height: 0, marginTop: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {t(`${name}-text`)}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
