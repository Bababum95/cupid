import { FC } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import type { Price } from "@/types";
import { formatPrice } from "@/utils";

import {
  CIRCLE_INITIAL,
  CIRCLE_ACTIVE,
  ITEM_HOVER,
  ITEM_INITIAL,
  ITEM_ACTIVE,
} from "./config";
import styles from "./Variant.module.scss";

type Props = {
  active: boolean;
  onSelect: () => void;
  price: Price;
  count: number;
};

export const Variant: FC<Props> = ({ active, onSelect, price, count }) => {
  const t = useTranslations("SexChocolate");

  return (
    <motion.li
      className={classNames(styles.item, {
        [styles.selected]: active,
      })}
      onClick={onSelect}
      whileHover={ITEM_HOVER}
      initial={ITEM_INITIAL}
      animate={active ? ITEM_ACTIVE : ITEM_INITIAL}
      transition={{ duration: 0.25 }}
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
          />
        </svg>
        <span>
          {count} {count > 1 ? t("boxes") : t("box")}
        </span>
      </div>
      <span className={styles.price}>
        {formatPrice({
          amount: price.amount / count,
          currencyCode: price.currencyCode,
        })}
        /{t("box")}
      </span>
    </motion.li>
  );
};
