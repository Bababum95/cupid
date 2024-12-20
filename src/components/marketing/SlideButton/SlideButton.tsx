"use client";

import { type FC, useState } from "react";
import { motion, type PanInfo } from "motion/react";
import classNames from "classnames";

import { useRouter } from "@/i18n/routing";
import ArrowIcon from "@/icons/arrow.svg";

import styles from "./SlideButton.module.scss";

export const SlideButton: FC = () => {
  const [complete, setComplete] = useState(false);
  const router = useRouter();

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if ((offsetX > 100 && velocityX > 500) || offsetX > 200) {
      setComplete(true);
      router.push("/");
    }
  };



  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <motion.div
          className={classNames(styles.progress, {
            [styles.complete]: complete,
          })}
          drag="x"
          dragElastic={0.01}
          dragSnapToOrigin
          dragConstraints={{ left: 0, right: 275 }}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.button}>
            <ArrowIcon />
          </div>
        </motion.div>
      </div>
      <p className={styles.text}>Kostenlose Lieferung aktivieren</p>
    </div>
  );
};
