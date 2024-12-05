"use client";

import { type FC, useState } from "react";
import { useTranslations } from "next-intl";

import StarIcon from "@/icons/star.svg";

import { PRODUCT_FEATURES } from "./config";
import { ShippingInfo } from "./ShippingInfo";
import { ProductGallery } from "./ProductGallery";
import { ProductForm } from "./ProductForm";
import { ProductInfo } from "./ProductInfo";
import styles from "./ProductDisplay.module.scss";

export const ProductDisplay: FC = () => {
  const [selectedBox, setSelectedBox] = useState(0);
  const t = useTranslations("HomePage");

  const handleBuyClick = () => {};

  return (
    <div className={styles.wrapper}>
      <ProductGallery />
      <div className={styles.info}>
        <div className={styles.rating}>
          <div className={styles.stars} aria-label="5 out of 5 stars rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                fill="#DBAD3A"
                width={19}
                height={19}
                viewBox="0 0 24 24"
              />
            ))}
          </div>
          <p>{t("V2.rating", { amount: 1000 })}</p>
        </div>
        <h1 className={styles.title}>Cupid Chocolate</h1>
        <div className={styles.features}>
          {PRODUCT_FEATURES.map((feature, index) => (
            <span key={index}>{t(`features.${feature}`)}</span>
          ))}
        </div>
        <ProductForm
          selectedBox={selectedBox}
          handleChange={(index) => setSelectedBox(index)}
          handleBuyClick={handleBuyClick}
        />
        <ShippingInfo />
        <ProductInfo />
      </div>
    </div>
  );
};
