"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import { useAppDispatch } from "@/hooks";
import {
  discountCodeUpdate,
  removeLine as removeCartLine,
  addLine as addLineToCart,
} from "@/lib/slices/cart";
import HeartIcon from "@/icons/heart.svg";

import styles from "./ProgressBar.module.scss";

type Props = {
  /** Total amount spent by the user */
  total?: number;
  /** Chocolate level required for next gift threshold */
  chocolate?: number;
  /** Indicates whether the gift has already been added */
  complete?: boolean;
  /** Gift details, including discount code and item ID */
  gift?: {
    code: string;
    id: string;
  };
};

/**
 * ProgressBar component that visually represents the user's progress towards
 * a spending threshold to unlock a free gift. As the `total` approaches
 * `max`, the component dynamically updates to show progress percentage and unlocks
 * a gift when the threshold is met.
 *
 * @param {Props} props - The component props.
 * @param {number} [props.total] - Total amount spent by the user, which determines progress.
 * @param {number} [props.chocolate=0] - Chocolate threshold required for the next free gift.
 * @param {boolean} [props.complete] - Marks if the gift has been added already.
 * @param {object} [props.gift] - Contains discount code and item ID for the gift.
 *
 * @returns {JSX.Element | null} - A visual progress bar or null if no total or chocolate value is provided.
 */
export const ProgressBar: FC<Props> = ({
  total,
  gift,
  complete,
  chocolate = 0,
}) => {
  const [isComplete, setIsComplete] = useState(complete);
  const t = useTranslations("Cart");
  const dispatch = useAppDispatch();

  // Determine the max threshold based on chocolate value.
  const max = chocolate < 40 ? 40 : chocolate < 60 ? 60 : 80;

  /**
   * Adds a gift to the cart and updates the discount code.
   * If a gift is already complete, does nothing.
   */
  const addGift = async () => {
    if (!gift || isComplete) return;
    setIsComplete(true);

    await dispatch(discountCodeUpdate({ code: gift.code, add: true }));
    dispatch(addLineToCart({ merchandiseId: gift.id, quantity: 1 }));
  };

  /**
   * Removes a gift from the cart and updates the discount code.
   * If no gift or the gift is not complete, does nothing.
   */
  const removeGift = async () => {
    if (!gift || !isComplete) return;
    Promise.all([
      dispatch(discountCodeUpdate({ code: gift.code, add: false })),
      dispatch(removeCartLine(gift.id)),
    ]);
  };

  /**
   * Watches for changes in `total` and `max`. Adds or removes the gift based on
   * whether the total amount meets or exceeds the threshold `max`.
   */
  useEffect(() => {
    if (total && total >= max) addGift();
    else removeGift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, max]);

  if (!total || !chocolate) return null;

  // Calculate progress as a percentage of the max threshold.
  const progress = total / max;

  // If progress reaches or exceeds 100%, display the "gift unlocked" message.
  if (progress >= 1) {
    return (
      <div className={classNames(styles.container, styles.complete)}>
        <HeartIcon />
        <div>
          <p className={styles.max}>{t("awesome")}</p>
          <p className={styles.current}>{t("included")}</p>
        </div>
      </div>
    );
  }

  // Otherwise, display the progress bar with the current progress percentage.
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <svg width="40" height="40" fill="none">
          <circle cx="20" cy="20" r="19" strokeWidth="2" stroke="#323234" />
          <motion.circle
            cx="20"
            cy="20"
            r="19"
            strokeWidth="2"
            stroke="#E9E9E9"
            animate={{ pathLength: progress }}
          />
        </svg>
        <span>{Math.floor(progress * 100)}%</span>
      </div>
      <div>
        <p className={styles.max}>{t("spend", { amount: max })}</p>
        {max > total && (
          <p className={styles.current}>
            <span>{(max - total).toFixed(2)} € </span>
            {t("more-until-your-free-gift")}
          </p>
        )}
      </div>
    </div>
  );
};
