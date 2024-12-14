import { FC, type ReactNode } from "react";
import { motion } from "motion/react";

import {
  CIRCLE_INITIAL,
  CIRCLE_ACTIVE,
  ITEM_HOVER,
  ITEM_INITIAL,
  ITEM_ACTIVE,
} from "./config";
import styles from "./RadioVariant.module.scss";

type Props = {
  active: boolean;
  onSelect: () => void;
  top?: ReactNode;
  children?: ReactNode;
};

export const RadioVariant: FC<Props> = ({
  active,
  onSelect,
  top,
  children,
}) => {
  return (
    <motion.li
      className={styles.item}
      onClick={onSelect}
      whileHover={active ? {} : ITEM_HOVER}
      initial={ITEM_INITIAL}
      animate={active ? ITEM_ACTIVE : ITEM_INITIAL}
      transition={{ duration: 0.25 }}
      key="item"
      role="radio"
      aria-checked={active}
      tabIndex={0}
    >
      <div className={styles.top}>
        <svg
          className="progress-icon"
          viewBox="0 0 18 19"
          width={18}
          height={18}
        >
          <motion.circle
            cx="9"
            cy="9"
            r="8.5"
            initial={CIRCLE_INITIAL}
            animate={active ? CIRCLE_ACTIVE : CIRCLE_INITIAL}
            transition={{ duration: 0.2 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke="#E9E9E9"
            d="M6 9.5L8.55303 12L12 7"
            strokeDasharray="0 1"
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.35 }}
            strokeLinejoin={active ? "round" : "miter"}
            strokeLinecap={active ? "round" : "butt"}
          />
        </svg>
        {top}
      </div>
      {children}
    </motion.li>
  );
};
