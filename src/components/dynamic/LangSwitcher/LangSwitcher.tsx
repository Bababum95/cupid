"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import ReactDOM from "react-dom";

import {
  usePathname,
  useRouter,
  routing,
  type LocaleType,
} from "@/i18n/routing";
import LangIcon from "@/icons/lang.svg";

import styles from "./LangSwitcher.module.scss";

export default function LangSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleChange = (nextLocale: LocaleType) => {
    router.replace(pathname, { ...params, locale: nextLocale });
  };

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <LangIcon width={18} height={18} />
      </button>
      {ReactDOM.createPortal(
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className={styles.popup}
              onClick={() => setIsOpen(false)}
              variants={{
                open: { opacity: 1, visibility: "visible" },
                closed: { opacity: 0, visibility: "hidden" },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div
                className={styles.container}
                onClick={(e) => e.stopPropagation()}
                variants={{ open: { y: 0 }, closed: { y: 100 } }}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <p className={styles.title}>{t("lang")}</p>
                {routing.locales.map((cur) => (
                  <motion.button
                    className={styles.lang}
                    key={cur}
                    onClick={() => handleChange(cur)}
                    animate={
                      locale === cur
                        ? {
                            backgroundColor: "rgba(124, 51, 51, 0.10)",
                            borderColor: "#520C11",
                          }
                        : {
                            backgroundColor: "rgba(124, 51, 51, 0)",
                            borderColor: "#1a1a1a",
                          }
                    }
                    whileTap={{ scale: 0.9 }}
                  >
                    {t("locale", { locale: cur })}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
