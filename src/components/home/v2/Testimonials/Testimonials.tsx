"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

import { Rating } from "../Rating/Rating";
import { Review } from "./Review";
import { REVIEWS, VARIANTS } from "./config";
import styles from "./Testimonials.module.scss";

export const Testimonials = () => {
  const t = useTranslations("HomePage");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "all" });

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Rating text={t("V2.rating", { amount: 1000 })} />
        <h2 className={styles.title}>{t("V2.Testimonials.title")}</h2>
        <p className={styles.subtitle}>{t("V2.Testimonials.subtitle")}</p>
      </div>
      <div className={styles.preview}>
        <motion.div
          variants={VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.review}
          transition={{ duration: 0.35, type: "tween" }}
        >
          <Review {...REVIEWS[0]} />
        </motion.div>
        <Image
          className={styles.image}
          src="/images/testimonials.jpeg"
          alt="Customer testimonial illustration"
          width={408}
          height={280}
          ref={ref}
        />
        <motion.div
          variants={VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.review}
          transition={{ duration: 0.35, delay: 0.25, type: "tween" }}
        >
          <Review {...REVIEWS[1]} />
        </motion.div>
      </div>
    </div>
  );
};
