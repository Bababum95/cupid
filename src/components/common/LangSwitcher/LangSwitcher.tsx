"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

import {
  usePathname,
  useRouter,
  routing,
  type LocaleType,
} from "@/i18n/routing";
import LangIcon from "@/icons/lang.svg";

import styles from "./LangSwitcher.module.scss";

const Popup = dynamic(() => import("@/components/dynamic/Popup"), {
  ssr: false,
});

export const LangSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleChange = (nextLocale: LocaleType) => {
    Cookies.set("LS", "true", { expires: 365 });
    router.replace(pathname, { ...params, locale: nextLocale });
  };

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <LangIcon width={18} height={18} />
      </button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} size="small">
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
      </Popup>
    </>
  );
};
