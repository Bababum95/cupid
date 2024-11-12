"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";

import styles from "./Ingredients.module.scss";

const LIST_OF_SLIDES = Array.from({ length: 6 }, (_, i) => i + 1);
const TOTAL_FRAMES = 108;
const CHUNK_SIZE = 20;

export const Ingredients = () => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const t = useTranslations("Ingredients");
  const [currentChunk, setCurrentChunk] = useState(0);

  useEffect(() => {
    const loadChunk = async (chunkIndex: number) => {
      const startIndex = chunkIndex * CHUNK_SIZE;
      const endIndex = Math.min(startIndex + CHUNK_SIZE, TOTAL_FRAMES);

      for (let i = startIndex; i < endIndex; i++) {
        const img = new Image();
        img.src = `animations/${i + 1}_q95.webp`;
        img.onload = () => {
          setImages((prev) => {
            const newImages = [...prev];
            newImages[i] = img;
            return newImages;
          });
        };
      }
    };

    loadChunk(currentChunk);
  }, [currentChunk]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * TOTAL_FRAMES),
      images.length - 1
    );

    if (images[frameIndex]) {
      const ctx = canvasRef.current!.getContext("2d");
      ctx!.drawImage(
        images[frameIndex],
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
    }

    if (
      frameIndex >= (currentChunk + 1) * CHUNK_SIZE - CHUNK_SIZE / 2 &&
      (currentChunk + 1) * CHUNK_SIZE < TOTAL_FRAMES
    ) {
      setCurrentChunk((prevChunk) => prevChunk + 1);
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
