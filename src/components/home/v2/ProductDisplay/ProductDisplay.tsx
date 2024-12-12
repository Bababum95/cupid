"use client";

import { type FC, useState, useRef } from "react";
import { useTranslations } from "next-intl";

import type { ProductType } from "@/types";

import { Rating } from "../Rating/Rating";
import { PRODUCT_FEATURES, PRODUCT_VARIANTS, REGULAR_PRICE } from "./config";
import { ProductForm } from "./ProductForm";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ShippingInfo } from "./ShippingInfo";
import { Upsell } from "./Upsell";
import styles from "./ProductDisplay.module.scss";

type CartState = {
  main: string | null;
  upsell?: {
    id: string;
    price: number;
  };
  total?: {
    regular: number;
    discount: number;
  };
};

type Props = {
  upsell?: ProductType;
  locale: string;
};

export const ProductDisplay: FC<Props> = ({ upsell, locale }) => {
  const t = useTranslations("HomePage");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const [cart, setCart] = useState<CartState>({ main: null });

  const addUpsellToCart = (id: string, price: number) => {
    setCart((prev) => ({
      ...prev,
      upsell: {
        id,
        price,
      },
    }));
  };

  const handleChangeBox = (id: string) => {
    const selectedProduct = PRODUCT_VARIANTS.find(
      (variant) => variant.id === id
    );

    if (!selectedProduct) return;

    setCart((prev) => ({
      ...prev,
      main: id,
      total: {
        regular:
          REGULAR_PRICE * selectedProduct.quantity + (prev.upsell?.price ?? 0),
        discount:
          selectedProduct.price * selectedProduct.quantity +
          (prev.upsell?.price ?? 0),
      },
    }));

    const slides = wrapperRef.current?.querySelectorAll(".swiper-slide");

    if (!slides) return;

    const slideIndex = Array.from(slides).findIndex(
      (slide) =>
        slide.getAttribute("data-swiper-slide-index") === selectedProduct.image
    );

    if (slideIndex === -1) return;

    setCurrentImage(slideIndex);
  };

  const handleBuyClick = async () => {
    console.log(upsell);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <ProductGallery
        currentImage={currentImage}
        locale={locale === "en" ? "en" : "de"}
      />
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
          total={cart.total}
        />
        <ShippingInfo />
        <ProductInfo />
        {upsell && <Upsell product={upsell} addToCart={addUpsellToCart} />}
      </div>
    </div>
  );
};
