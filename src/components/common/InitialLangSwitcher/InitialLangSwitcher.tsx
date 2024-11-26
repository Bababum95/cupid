"use client";

import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
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

import styles from "./InitialLangSwitcher.module.scss";

/**
 * InitialLangSwitcher - Component for language switching with a dropdown of supported locales.
 *
 * @returns JSX.Element - Language switcher element for changing the application's language.
 */
export const InitialLangSwitcher: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // State for selected locale, dropdown open status, and visibility of the switcher
  const [nextLocale, setNextLocale] = useState<LocaleType>("de");
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(false);

  // Check cookie on mount
  useEffect(() => {
    const isLangSwitcherClosed = Cookies.get("LS") === "true";

    if (isLangSwitcherClosed) setIsInitialRender(true);
  }, []);

  /**
   * handleChange - Form submit handler for changing the language and hiding the switcher.
   * @param evt - Form submit event
   */
  const handleChange = (evt: React.FormEvent) => {
    evt.preventDefault();
    Cookies.set("LS", "true", { expires: 365 });
    setIsShow(false);
    router.replace(pathname, { ...params, locale: nextLocale });
  };

  // Icon for the selected next locale
  const NextLocaleIcon = LOCALES_DATE[nextLocale].Icon;

  /**
   * open - Function to open the dropdown
   */
  const open = () => {
    setIsOpen(true);
  };

  /**
   * close - Function to close the dropdown
   */
  const close = () => {
    setIsOpen(false);
  };

  /**
   * useEffect - Event listener management for closing the dropdown when clicking outside
   */
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", close);
    } else {
      document.removeEventListener("click", close);
    }

    return () => {
      document.removeEventListener("click", close);
    };
  }, [isOpen]);

  // Avoid rendering the component until the initial cookie check is complete
  if (isInitialRender) return null;

  return (
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
      initial="show"
      animate={isShow ? "show" : "hide"}
      exit="hide"
      transition={{ duration: 0.3, type: "tween" }}
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
                    onClick={() => setNextLocale(cur)}
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
  );
};
