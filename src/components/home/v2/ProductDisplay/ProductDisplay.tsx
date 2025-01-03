"use client";

import { type FC, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { ProductType, CreateCartInput } from "@/types";
import { useAppDispatch } from "@/hooks";
import { getCookie, prepearCheckoutURL } from "@/utils";
import { ProductGallery, ProductInfo } from "@/components";
import { useRouter } from "@/i18n/routing";
import { create as createCart } from "@/lib/slices/cart";
import CupidHeartIcon from "@/icons/cupid-heart.svg";

import { Rating } from "../Rating/Rating";
import { PRODUCT_FEATURES, PRODUCT_VARIANTS, REGULAR_PRICE } from "./config";
import { ProductForm } from "./ProductForm";
import { ShippingInfo } from "./ShippingInfo";
import { Upsell } from "./Upsell";
import styles from "./ProductDisplay.module.scss";

type CartState = {
  main: string | null;
  loading?: boolean;
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const [cart, setCart] = useState<CartState>({ main: null });

  const addUpsellToCart = (id: string, price: number) => {
    setCart((prev) => ({ ...prev, upsell: { id, price } }));
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

  const handleBuyClick = async (sourceUrl: string) => {
    if (!cart.main) return;

    setCart((prev) => ({ ...prev, loading: true }));

    const selectedProduct = PRODUCT_VARIANTS.find(
      (variant) => variant.id === cart.main
    );
    if (!selectedProduct) return;
    const input: CreateCartInput = {
      lines: [{ merchandiseId: selectedProduct.id, quantity: 1 }],
      attributes: [{ key: "Site version", value: "2" }],
      discountCodes: [],
    };

    const referrer = getCookie("referrer");
    if (referrer) {
      input.attributes?.push({ key: "Referrer", value: referrer });
    }

    if (cart.upsell) {
      input.lines.push({ merchandiseId: cart.upsell.id, quantity: 1 });
    }

    if (selectedProduct.gifts) {
      input.lines = [...input.lines, ...selectedProduct.gifts];
    }

    if (selectedProduct.discountCodes) {
      input.discountCodes = selectedProduct.discountCodes;
    }

    const res = await dispatch(createCart({ input, locale })).unwrap();

    if (res.checkoutUrl) {
      const url = prepearCheckoutURL({
        sourceUrl,
        targetUrl: res.checkoutUrl,
        locale,
      });
      router.push(url);
    } else {
      console.log(res);
      setCart((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.gallery} aria-label="Product images">
        <ProductGallery
          currentImage={currentImage}
          locale={locale === "en" ? "en" : "de"}
        />
        <div className={styles.thumbnails}>
          <Image
            className={styles.thumbnail}
            src="/images/home/v2/1.jpg"
            alt="Girl with a chocolate"
            width={758}
            height={322}
            quality={90}
          />
          <Image
            className={styles.thumbnail}
            src="/images/home/v2/ingredients/1.jpg"
            alt="Chocolate"
            width={369}
            height={322}
            quality={80}
          />
          <Image
            className={styles.thumbnail}
            src="/images/home/v2/2.jpg"
            alt="Girl eating a chocolate"
            width={369}
            height={322}
            quality={80}
          />
        </div>
      </div>
      <div className={styles.info} id="product">
        <Rating text={t("V2.rating", { amount: 1000 })} />
        <h1 className={styles.title}>{t("V2.name")}</h1>
        <div className={styles.features}>
          {PRODUCT_FEATURES.map((feature, index) => (
            <div key={index}>
              <CupidHeartIcon />
              <span>{t(`features.${feature}`)}</span>
            </div>
          ))}
        </div>
        <ProductForm
          selectedBox={cart.main}
          handleChange={handleChangeBox}
          handleBuyClick={handleBuyClick}
          total={cart.total}
          loading={cart.loading}
        />
        <ShippingInfo />
        <ProductInfo />
        {upsell && <Upsell product={upsell} addToCart={addUpsellToCart} />}
      </div>
    </div>
  );
};
