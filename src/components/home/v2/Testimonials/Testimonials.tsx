import { useTranslations } from "next-intl";
import Image from "next/image";

import { Rating } from "../Rating/Rating";
import { Review } from "./Review";
import { REVIEWS } from "./config";
import styles from "./Testimonials.module.scss";

export const Testimonials = () => {
  const t = useTranslations("HomePage");

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Rating text={t("V2.rating", { amount: 1000 })} />
        <h2 className={styles.title}>{t("V2.Testimonials.title")}</h2>
        <p className={styles.subtitle}>{t("V2.Testimonials.subtitle")}</p>
      </div>
      <div className={styles.preview}>
        <div className={styles.review}>
          <Review {...REVIEWS[0]} />
        </div>
        <Image
          className={styles.image}
          src="/images/testimonials.jpeg"
          alt="Customer testimonial illustration"
          width={408}
          height={280}
        />
        <div className={styles.review}>
          <Review {...REVIEWS[1]} />
        </div>
      </div>
    </div>
  );
};
