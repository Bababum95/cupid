"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";

import styles from "./Ingredients.module.scss";

const LIST_OF_SLIDES = Array.from({ length: 6 }, (_, i) => i + 1);
const TOTAL_FRAMES = 108;
const LIST_OF_FRAMES = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `animations/${i + 1}_q95.webp`
);

export const Ingredients = () => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const t = useTranslations("Ingredients");

  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 0; i < LIST_OF_FRAMES.length; i++) {
        const img = new Image();
        img.src = LIST_OF_FRAMES[i];
        await img.decode();
        if (!isMounted) return;
        loadedImages.push(img);
      }
      if (isMounted) {
        setImages(loadedImages);
      }
    };
    loadImages();
    return () => {
      isMounted = false;
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (canvasRef.current && images.length > 0) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const frameIndex = Math.min(
          Math.floor(latest * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );
        const img = images[frameIndex];
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      listRef.current!.style.setProperty(
        "--progress",
        `${Math.floor(
          Math.min(latest * LIST_OF_SLIDES.length, LIST_OF_SLIDES.length - 1)
        )}`
      );
    }
  });

  useEffect(() => {
    if (canvasRef.current && images.length > 0) {
      const img = images[0];
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
    }
  }, [images]);

  return (
    <section className={styles.section} ref={sectionRef} id="ingredients">
      <div className={styles.wrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <h2 className={styles.title}>{t("title")}</h2>
        <ul className={styles.list} ref={listRef}>
          {LIST_OF_SLIDES.map((item) => (
            <li key={item} className={styles.item}>
              <h3 className={styles.subtitle}>
                <span>{t(`list.${item}.name`)}</span> -{" "}
                {t(`list.${item}.property`)}
              </h3>
              <div className={styles.description}>
                <p className={styles.text}>
                  {t.rich(`list.${item}.description`, {
                    span: (chunks) => <span>{chunks}</span>,
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
