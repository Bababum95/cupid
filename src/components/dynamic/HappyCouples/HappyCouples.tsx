"use client";

import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import classNames from "classnames";

import { HAPPY_COUPLES } from "./config";
import styles from "./HappyCouples.module.scss";

const half = Math.floor(HAPPY_COUPLES.length / 2);
const desktopImages = HAPPY_COUPLES.slice(0, half);
const mobileImages = HAPPY_COUPLES.slice(half);

const HappyCouples = () => {
  const t = useTranslations("HomePage.V2");
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const images = isMobile ? desktopImages : HAPPY_COUPLES;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        {t("happy-couples", { amount: "1,000" })}
      </h2>
      <div className={styles.images}>
        <div className={styles.row}>
          {images.map((src, index) => (
            <Image
              className={styles.image}
              src={src}
              alt={`happy-couple-${index}`}
              width={240}
              height={240}
              key={`happy-couple-${index}`}
              quality={90}
            />
          ))}
        </div>
        <div className={styles.row}>
          {images.map((src, index) => (
            <Image
              className={styles.image}
              src={src}
              alt={`happy-couple-${index}`}
              width={240}
              height={240}
              key={`happy-couple-${index}`}
              quality={90}
            />
          ))}
        </div>
      </div>
      <div className={classNames(styles.images, styles.mobile)}>
        <div className={styles.row}>
          {mobileImages.map((src, index) => (
            <Image
              className={styles.image}
              src={src}
              alt={`happy-couple-${index}`}
              width={240}
              height={240}
              key={`happy-couple-${index}`}
              quality={90}
            />
          ))}
        </div>
        <div className={styles.row}>
          {mobileImages.map((src, index) => (
            <Image
              className={styles.image}
              src={src}
              alt={`happy-couple-${index}`}
              width={240}
              height={240}
              key={`happy-couple-${index}`}
              quality={90}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappyCouples;
