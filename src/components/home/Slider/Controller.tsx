import React from "react";
import { useSwiper } from "swiper/react";
import { useTranslations } from "next-intl";

import ArrowIcon from "@/icons/arrow.svg";

import styles from "./Controller.module.scss";

export const Controller = () => {
  const swiper = useSwiper();
  const t = useTranslations("Common");

  return (
    <div className={styles.buttons}>
      <button className={styles.button} onClick={() => swiper.slidePrev()}>
        <ArrowIcon />
        {t("prev")}
      </button>
      <button className={styles.button} onClick={() => swiper.slideNext()}>
        {t("next")}
        <ArrowIcon />
      </button>
    </div>
  );
};
