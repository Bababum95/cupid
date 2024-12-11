"use client";

import { type FC, useState } from "react";
import { useTranslations } from "next-intl";

import type { ProductType } from "@/types";

import { Rating } from "../Rating/Rating";
import { PRODUCT_FEATURES, PRODUCT_VARIANTS } from "./config";
import { ProductForm } from "./ProductForm";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ShippingInfo } from "./ShippingInfo";
import { Upsell } from "./Upsell";
import styles from "./ProductDisplay.module.scss";

type CartState = {
  main: string | null;
  upsell: string | null;
};

type Props = {
  upsell?: ProductType;
};

export const ProductDisplay: FC<Props> = ({ upsell }) => {
  const t = useTranslations("HomePage");
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const [cart, setCart] = useState<CartState>({
    main: null,
    upsell: null,
  });

  const handleChangeBox = (id: string) => {
    setCart((prev) => ({ ...prev, main: id }));
    const slideIndex = PRODUCT_VARIANTS.find(
      (variant) => variant.id === id
    )?.image;
    if (slideIndex) {
      setCurrentImage(slideIndex);
    }
  };

  const handleBuyClick = async () => {
    console.log(upsell);
  };

  return (
    <div className={styles.wrapper}>
      <ProductGallery currentImage={currentImage} />
      <div className={styles.info} id="product">
        <Rating text={t("V2.rating", { amount: 1000 })} />
        <h1 className={styles.title}>Cupid Chocolate</h1>
        <div className={styles.features}>
          {PRODUCT_FEATURES.map((feature, index) => (
            <span key={index}>{t(`features.${feature}`)}</span>
          ))}
        </div>
        <ProductForm
          selectedBox={cart.main}
          handleChange={handleChangeBox}
          handleBuyClick={handleBuyClick}
        />
        <ShippingInfo />
        <ProductInfo />
        {upsell && <Upsell product={upsell} />}
      </div>
    </div>
  );
};
