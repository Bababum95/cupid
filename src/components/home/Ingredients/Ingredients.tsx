"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { NutritionalDrawerContent } from "@/components";

import styles from "./Ingredients.module.scss";

const SideDrawer = dynamic(() => import("@/components/dynamic/SideDrawer"), {
  ssr: false,
});

const LIST_OF_SLIDES = Array.from({ length: 6 }, (_, i) => i + 1);
const TOTAL_FRAMES = 108;
const CHUNK_SIZE = 20;

/**
 * Ingredients component that displays an animated canvas synchronized with scroll position.
 * Images are loaded in chunks and cached to improve performance.
 * Now, chunks are loaded sequentially, starting the next chunk immediately after the previous one loads.
 */
export const Ingredients = () => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const t = useTranslations("HomePage.Ingredients");

  /**
   * Loads a chunk of images and caches them in the images array.
   * Once the chunk is loaded, it triggers the loading of the next chunk.
   * @param chunkIndex - The index of the chunk to load.
   */
  useEffect(() => {
    const loadChunk = async (chunkIndex: number) => {
      const startIndex = chunkIndex * CHUNK_SIZE;
      const endIndex = Math.min(startIndex + CHUNK_SIZE, TOTAL_FRAMES);

      const promises = [];

      for (let i = startIndex; i < endIndex; i++) {
        // Check if the image is already loaded to prevent reloading
        if (!images[i]) {
          const img = new Image();
          img.src = `animations/${i + 1}_q95.webp`;
          img.crossOrigin = "anonymous";

          const promise = new Promise<void>((resolve) => {
            img.onload = () => {
              setImages((prev) => {
                // Avoid unnecessary state updates if image is already cached
                if (prev[i]) return prev;
                const newImages = [...prev];
                newImages[i] = img;
                return newImages;
              });
              resolve();
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${img.src}`);
              resolve(); // Continue even if an image fails to load
            };
          });

          promises.push(promise);
        }
      }

      await Promise.all(promises);

      // After the current chunk is loaded, load the next chunk if any
      if ((chunkIndex + 1) * CHUNK_SIZE < TOTAL_FRAMES) {
        setCurrentChunk(chunkIndex + 1);
      }
    };

    loadChunk(currentChunk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChunk]);

  /**
   * Updates the canvas image based on scroll position.
   */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * TOTAL_FRAMES),
      images.length - 1
    );

    if (images[frameIndex]) {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.drawImage(
          images[frameIndex],
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    }

    listRef.current?.style.setProperty(
      "--progress",
      `${Math.floor(
        Math.min(latest * LIST_OF_SLIDES.length, LIST_OF_SLIDES.length - 1)
      )}`
    );

    // No longer need to trigger loading of the next chunk here
  });

  /**
   * Sets the canvas dimensions based on the first loaded image.
   */
  useEffect(() => {
    if (canvasRef.current && images.length > 0 && images[0]) {
      const img = images[0];
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
    }
  }, [images]);

  // const openDrawer = () => {
  //   document.body.classList.add("no-scroll");
  //   setDrawerIsOpen(true);
  // };

  const closeDrawer = () => {
    document.body.classList.remove("no-scroll");
    setDrawerIsOpen(false);
  };

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
        {/* <button className={styles.button} onClick={openDrawer}>
          {t("supplemen-facts")}
        </button> */}
      </div>
      <SideDrawer
        isOpen={drawerIsOpen}
        onClose={closeDrawer}
        title={t("nutritional-information")}
      >
        <NutritionalDrawerContent />
      </SideDrawer>
    </section>
  );
};
