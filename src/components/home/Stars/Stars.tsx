"use client";

import { FC, useEffect } from "react";
import { useAnimate, stagger } from "motion/react";

import StarIcon from "@/icons/star.svg";

import styles from "./Stars.module.scss";

export const Stars: FC = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate("svg", { fill: "#520C11" }, { delay: stagger(0.25) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper} ref={scope}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          fill="transparent"
          stroke="#520C11"
          width={26}
          height={26}
          viewBox="0 0 24 24"
        />
      ))}
    </div>
  );
};
