"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/hooks";
import {
  discountCodeUpdate,
  removeLine as removeCartLine,
  addLine as addLineToCart,
} from "@/lib/slices/cart";

import styles from "./ProgressBar.module.scss";

type Props = {
  total?: number;
  chocolate?: number;
  complete?: boolean;
  gift?: {
    code: string;
    id: string;
  };
};

export const ProgressBar: FC<Props> = ({
  total,
  gift,
  complete,
  chocolate = 0,
}) => {
  const [isComplete, setIsComplete] = useState(complete);
  const t = useTranslations("Cart");
  const dispatch = useAppDispatch();

  const max = chocolate < 40 ? 40 : chocolate < 60 ? 60 : 80;

  const addGift = async () => {
    if (!gift || isComplete) return;
    setIsComplete(true);

    await dispatch(discountCodeUpdate({ code: gift.code, add: true }));
    dispatch(addLineToCart({ merchandiseId: gift.id, quantity: 1 }));
  };

  const removeGift = async () => {
    if (!gift || !isComplete) return;
    Promise.all([
      dispatch(discountCodeUpdate({ code: gift.code, add: false })),
      dispatch(removeCartLine(gift.id)),
    ]);
  };

  useEffect(() => {
    if (total && total >= max) addGift();
    else removeGift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, max]);

  if (!total || !chocolate) return null;

  const progress = total / max;

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
        <span>{Math.floor(Math.min(progress * 100, 100))}%</span>
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
