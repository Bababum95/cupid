"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import styles from "./Gallery.module.scss";
import classNames from "classnames";

export const Gallery = () => {
  const t = useTranslations("HomePage");
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [maxScale, setMaxScale] = useState(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "start -100px"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, maxScale]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [20, 0]);

  useEffect(() => {
    if (imageRef.current && window) {
      const imgRect = imageRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      setMaxScale((windowWidth / imgRect.width) * 1.2);
      sectionRef.current?.style.setProperty(
        "--top",
        window.innerHeight / 2 - imgRect.height + "px"
      );
    }
  }, [imageRef]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.text}>
        <h2>{t("born-from-love")}</h2>
        <p>{t("born-from-love-text")}</p>
      </div>

      <div className={styles.wrapper}>
        <motion.div className={styles.images} style={{ scale }}>
          <div className={styles.row}>
            <Image
              src="/images/gallery/cupid-dice.jpg"
              alt="Cupid's Love Dice"
              width={133}
              height={278}
              className={styles.image}
            />
            <Image
              src="/images/gallery/4.jpg"
              alt="Cupid Aphrodisiac Chocolate"
              width={430}
              height={278}
              className={styles.image}
            />
            <Image
              src="/images/gallery/6.jpg"
              alt="Cupid Aphrodisiac Chocolate"
              width={320}
              height={278}
              className={styles.image}
            />
            <Image
              src="/images/gallery/1.jpg"
              alt="Cupid Aphrodisiac Chocolate"
              width={498}
              height={278}
              className={styles.image}
            />
          </div>
          <div className={styles.row}>
            <Image
              src="/images/gallery/cupid-dice-monochrome.jpg"
              alt="Cupid's Love Dice"
              width={400}
              height={278}
              className={styles.image}
            />
            <motion.img
              src="/images/gallery/7.jpg"
              alt="Cupid Aphrodisiac Chocolate"
              width={602}
              height={278}
              className={classNames(styles.image, styles.main)}
              ref={imageRef}
              style={{ borderRadius }}
            />
            <Image
              src="/images/gallery/2.jpg"
              alt="Cupid Aphrodisiac Chocolate"
              width={400}
              height={278}
              className={styles.image}
            />
          </div>
        </motion.div>
      </div>

      <div className={styles.filler}></div>
    </section>
  );
};
