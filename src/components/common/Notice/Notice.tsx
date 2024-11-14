"use client";

import { FC, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import HappyIcon from "@/icons/happy.svg";
import SadIcon from "@/icons/sad.svg";
import CloseIcon from "@/icons/close.svg";

import styles from "./Notice.module.scss";

type Props = {
  message: {
    title: string;
    description?: string;
  } | null;
  clear: () => void;
  duration?: number;
  success?: boolean;
};

/**
 * Notice component displays a message notification to the user with an animation.
 *
 * This component uses `motion/react` for animating the appearance and disappearance
 * of the notification. It shows the message, and automatically clears it after the specified
 * duration unless manually dismissed by the user.
 *
 * @param {Props} props - The properties for the Notice component.
 * - `message`: An object containing the title and optional description for the notification.
 * - `clear`: A function that clears the notification, either upon expiration of the timer or manually by the user.
 * - `duration`: (Optional) The time in seconds before the notification automatically clears, defaulting to 5 seconds.
 * - `success`: (Optional) A boolean indicating if the message represents a success or failure, affecting the displayed icon.
 *
 * @returns JSX.Element
 */
export const Notice: FC<Props> = ({
  message,
  clear,
  success,
  duration = 5,
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(clear, duration * 1000);
      return () => clearTimeout(timer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.div
          className={styles.wrapper}
          variants={{
            show: { opacity: 1, y: 0 },
            hide: { opacity: 0, y: 100 },
          }}
          initial="hide"
          animate="show"
          exit="hide"
          transition={{ duration: 0.25, type: "tween" }}
        >
          <motion.svg className={styles.border}>
            <motion.rect
              x={0}
              y={0}
              width="100%"
              height="100%"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={2}
              strokeLinecap="round"
              rx={20}
              ry={20}
            />
            <motion.rect
              x={0}
              y={0}
              width="100%"
              height="100%"
              fill="none"
              stroke="#520C11"
              strokeWidth={2}
              strokeLinecap="round"
              rx={20}
              ry={20}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration, delay: 0.25, type: "tween" }}
            />
          </motion.svg>
          <div className={styles.icon}>
            {success ? <HappyIcon /> : <SadIcon />}
          </div>
          <div className={styles.message}>
            <p className={styles.title}>{message.title}</p>
            {message.description && <p>{message.description}</p>}
          </div>
          <button className={styles.close} onClick={clear} type="button">
            <CloseIcon />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
