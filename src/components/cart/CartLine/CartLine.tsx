"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import Image from "next/image";

import { Image as ImageType } from "@/types";
import { useAppDispatch } from "@/hooks";
import { Price } from "@/components";
import {
  discountCodeUpdate,
  removeLine as removeCartLine,
  addLine as addLineToCart,
} from "@/lib/slices/cart";
import CloseIcon from "@/icons/close.svg";

import styles from "./CartLine.module.scss";

type Props = {
  image?: ImageType | null;
  title: string;
  description?: string;
  canRemove?: boolean;
  removing?: boolean;
  id: string;
  price: string;
  oldPrice?: string | null;
  gift?: string;
};

export const CartLine: FC<Props> = ({
  image,
  title,
  description,
  canRemove,
  id,
  removing,
  price,
  oldPrice,
  gift,
}) => {
  const [isLoading, setIsLoading] = useState({
    gift: false,
  });
  const dispatch = useAppDispatch();
  const t = useTranslations("Cart");

  const handleRemove = async (lineId: string) => {
    dispatch(removeCartLine(lineId));
  };

  const addGift = async () => {
    if (!gift) return;
    setIsLoading((prev) => ({ ...prev, gift: true }));
    await dispatch(discountCodeUpdate({ code: gift, add: true }));
    await dispatch(addLineToCart({ merchandiseId: id, quantity: 1 }));
    setIsLoading((prev) => ({ ...prev, gift: false }));
  };

  return (
    <li
      className={classNames(styles.item, {
        [styles.removing]: removing,
      })}
    >
      <Image
        src={image?.url || "/favicon.ico"}
        alt={title}
        width={123}
        height={123}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {gift && <span className={styles.free}>{t("free-gift")}</span>}
        {canRemove && (
          <button
            className={styles.remove}
            onClick={() => handleRemove(id)}
            type="button"
          >
            <CloseIcon />
          </button>
        )}
        <p className={styles.description}>{description}</p>
        <div className={styles.bottom}>
          {gift && (
            <button
              className={classNames(styles.button, {
                [styles.loading]: isLoading.gift,
              })}
              type="button"
              onClick={addGift}
            >
              {t("pick-up-your-gift")}
            </button>
          )}
          <Price price={price} old={oldPrice} />
        </div>
      </div>
    </li>
  );
};
