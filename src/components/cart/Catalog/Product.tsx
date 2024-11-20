"use client";
import { FC, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import classNames from "classnames";

import type { ProductType } from "@/types";
import { Price } from "@/components";
import { dataUtils } from "@/utils";

import styles from "./Product.module.scss";

type Props = {
  product: ProductType;
  openPopup: (product: ProductType) => void;
  handleAddToCart: (id: string) => void;
};

export const Product: FC<Props> = ({ product, openPopup, handleAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Common");

  const addTocart = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (product.variants.length === 1) {
      setIsLoading(true);
      await handleAddToCart(product.variants[0].id);
      setIsLoading(false);
    } else {
      openPopup(product);
    }
  };

  return (
    <motion.li
      layoutId={product.variants[0].id}
      className={styles.item}
      onClick={() => openPopup(product)}
    >
      {product.bage && (
        <div className={styles.bages}>
          {dataUtils.splitStringWithLimit(product.bage).map((bage, index) => (
            <span key={index}>{bage}</span>
          ))}
        </div>
      )}
      <Image
        src={product.featuredImage?.url || "/favicon.ico"}
        alt={product.title}
        width={350}
        height={350}
        className={styles.image}
        quality={90}
      />
      <motion.h3 className={styles.title}>{product.title}</motion.h3>
      <motion.p className={styles.description}>{product.description}</motion.p>
      <motion.div className={styles.actions}>
        <Price
          price={dataUtils.formatPrice(product.variants[0].price)}
          old={dataUtils.formatPrice(product.variants[0].compareAtPrice)}
          left
        />
        <button
          className={classNames(styles.button, { [styles.loading]: isLoading })}
          onClick={addTocart}
        >
          {t("add-to-cart")}
        </button>
      </motion.div>
    </motion.li>
  );
};
