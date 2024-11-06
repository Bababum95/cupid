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
      setMaxScale(windowWidth / imgRect.width);
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
              src="/images/gallery/55427a7ecde126bdbfe9d797a7a39c30.png"
              alt="Cupid Aphrodisiac Chocolate"
              width={133}
              height={278}
              className={styles.image}
            />
            <Image
              src="/images/gallery/b543b75a4cb7f2125c3577d69f556b85.png"
              alt="Cupid Aphrodisiac Chocolate"
              width={430}
              height={278}
              className={styles.image}
            />
            <Image
              src="/images/gallery/65a21a78e35f4b6de119b097f0dd4f1a.png"
              alt="Cupid Aphrodisiac Chocolate"
              width={320}
              height={278}
              className={styles.image}
            />
            <Image
              src="/images/gallery/2fe7158d740321965705321491b51184.png"
              alt="Cupid Aphrodisiac Chocolate"
              width={498}
              height={278}
              className={styles.image}
            />
          </div>
          <div className={styles.row}>
            <Image
              src="/images/gallery/0e9203b90ca98e59c0517d0819bc845d.png"
              alt="Cupid Aphrodisiac Chocolate"
              width={400}
              height={278}
              className={styles.image}
            />
            <motion.img
              src="/images/chocolate.jpg"
              alt="Cupid Aphrodisiac Chocolate"
              width={602}
              height={278}
              className={classNames(styles.image, styles.main)}
              ref={imageRef}
              style={{ borderRadius }}
            />
            <Image
              src="/images/gallery/2e350954be8a9eab7f7883f546a9ae61.png"
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
