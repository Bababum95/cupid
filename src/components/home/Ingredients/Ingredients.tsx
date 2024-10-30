"use client";

import { useRef, ReactNode } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";

import styles from "./Ingredients.module.scss";

const list = Array.from({ length: 6 }, (_, i) => i + 1);

export const Ingredients = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const t = useTranslations("Ingredients");

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.readyState) {
      videoRef.current.currentTime = videoRef.current.duration * latest;

      listRef.current!.style.setProperty(
        "--progress",
        `${Math.floor(Math.min(latest * list.length, list.length - 1))}`
      );
    }
  });

  return (
    <section className={styles.section} ref={sectionRef} id="ingredients">
      <div className={styles.wrapper}>
        <video
          ref={videoRef}
          src="/videos/cupid-choco.mov"
          muted
          preload="auto"
          loop
          className={styles.video}
        />
        <h2 className={styles.title}>{t("title")}</h2>
        <ul className={styles.list} ref={listRef}>
          {list.map((item) => (
            <li key={item} className={styles.item}>
              <h3 className={styles.subtitle}>
                <span>{t(`list.${item}.name`)}</span> -{" "}
                {t(`list.${item}.property`)}
              </h3>
              <div className={styles.description}>
                <p className={styles.text}>
                  {t.rich(`list.${item}.description`, {
                    span: (chunks: ReactNode) => <span>{chunks}</span>,
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
