"use client";

import React, { FC, useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import classNames from "classnames";
import Cookies from "js-cookie";

import { LOCALES_DATE } from "@/i18n/config";
import {
  usePathname,
  useRouter,
  routing,
  type LocaleType,
} from "@/i18n/routing";
import CloseIcon from "@/icons/close.svg";
import ArrowIcon from "@/icons/arrow.svg";

import styles from "./LangSwitcher.module.scss";

export const LangSwitcher: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [nextLocale, setNextLocale] = useState<LocaleType>("de");
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(locale === routing.defaultLocale);

  const handleChange = (evt: React.FormEvent) => {
    evt.preventDefault();
    Cookies.set("LS", "true", { expires: 365 });
    setIsShow(false);
    router.replace(pathname, { ...params, locale: nextLocale });
  };

  const NextLocaleIcon = LOCALES_DATE[nextLocale].Icon;

  const open = () => {
    document.addEventListener("click", close);
    setIsOpen(true);
  };

  const close = () => {
    document.removeEventListener("click", close);
    setIsOpen(false);
  };

  return (
    <AnimatePresence initial={false}>
      {isShow && (
        <motion.aside
          className={styles.wrapper}
          key="langSwitcher"
          variants={{
            show: {
              opacity: 1,
              visibility: "visible",
              y: 0,
              height: "auto",
            },
            hide: {
              opacity: 0,
              visibility: "hidden",
              y: -100,
              height: 0,
            },
          }}
          initial="hide"
          animate="show"
          exit="hide"
          transition={{ duration: 0.3, type: "tween", delay: 0.05 }}
        >
          <div className={styles.content}>
            <p className={styles.text}>Change your language</p>
            <form
              className={styles.form}
              onSubmit={handleChange}
              aria-label="lang switcher"
            >
              <div className={styles.dropdown}>
                <motion.div
                  className={styles.active}
                  aria-label="toggle open dropdown"
                  tabIndex={0}
                  role="button"
                  onClick={isOpen ? close : open}
                  variants={{
                    open: {
                      borderRadius: "12px 12px 0 0",
                    },
                    close: {
                      borderRadius: "12px",
                    },
                  }}
                  initial="close"
                  animate={isOpen ? "open" : "close"}
                  exit="close"
                  transition={{ duration: 0.15, type: "tween", delay: 0.05 }}
                >
                  <NextLocaleIcon />
                  <span className={styles.label}>
                    {LOCALES_DATE[nextLocale].label}
                  </span>
                  <motion.span
                    className={styles.arrow}
                    variants={{ open: { rotate: 90 }, close: { rotate: -90 } }}
                    initial="close"
                    animate={isOpen ? "open" : "close"}
                    exit="close"
                    transition={{ duration: 0.15, type: "tween" }}
                  >
                    <ArrowIcon />
                  </motion.span>
                </motion.div>
                <motion.ul
                  className={styles.list}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      visibility: "visible",
                    },
                    close: {
                      y: -20,
                      opacity: 0,
                      visibility: "hidden",
                    },
                  }}
                  initial="close"
                  animate={isOpen ? "open" : "close"}
                  exit="close"
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  {routing.locales.map((cur) => {
                    const Icon = LOCALES_DATE[cur].Icon;

                    return (
                      <li
                        key={cur}
                        className={classNames(styles.item, {
                          [styles.selected]: cur === nextLocale,
                        })}
                        onClick={() => {
                          setNextLocale(cur);
                          close();
                        }}
                      >
                        <Icon />
                        <span className={styles.label}>
                          {LOCALES_DATE[cur].label}
                        </span>
                      </li>
                    );
                  })}
                </motion.ul>
              </div>
              <button type="submit" className={styles.submit}>
                Continue
              </button>
              <button
                type="button"
                className={styles.close}
                aria-label="Close lang switcher"
                onClick={() => {
                  Cookies.set("LS", "true", { expires: 365 });
                  setIsShow(false);
                }}
              >
                <CloseIcon />
              </button>
            </form>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
