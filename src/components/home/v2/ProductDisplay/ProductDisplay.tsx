"use client";

import { type FC, useState } from "react";
import { useTranslations } from "next-intl";

import { Rating } from "../Rating/Rating";
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
        <Rating text={t("V2.rating", { amount: 1000 })} />
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
