"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import { dataUtils } from "@/utils";

import { SHIPPING_FEATURES } from "./config";
import styles from "./ShippingInfo.module.scss";

export const ShippingInfo = () => {
  const t = useTranslations("HomePage");
  const [time, setTime] = useState({
    day: 0,
    date: new Date(),
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    setTime(dataUtils.getShippingDate());

    const interval = setInterval(() => {
      setTime(dataUtils.getShippingDate());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      {!(time.hours === 0 && time.minutes === 0) && (
        <p className={styles.date}>
          {t.rich("V2.shipping", {
            day: time.day,
            shippingDate: time.date,
            hours: time.hours,
            minutes: time.minutes,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      )}
      <ul className={styles.features}>
        {SHIPPING_FEATURES.map(({ icon, text, large }, index) => (
          <li
            className={classNames(styles.item, { [styles.large]: large })}
            key={index}
          >
            <img
              loading="lazy"
              src={icon}
              alt={`${text} icon`}
              className={styles.icon}
            />
            <span>{t(`V2.${text}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
