"use client";

import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";

import styles from "./Ingredients.module.scss";

export const Ingredients = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (videoRef.current && videoRef.current.readyState) {
        videoRef.current.currentTime = videoRef.current.duration * progress;
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <video
        ref={videoRef}
        src="/videos/cupid-choco.mov"
        muted
        preload="auto"
        loop
        className={styles.video}
      />
    </section>
  );
};
