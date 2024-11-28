"use client";

import { FC, useRef } from "react";
import { useTranslations } from "next-intl";

import { dataUtils } from "@/utils";
import { SubmitButton } from "@/components";
import type { ProductType, VariantProductType, GiftType } from "@/types";

import { Gift } from "./Gift";
import { Variant } from "./Variant";
import styles from "./StepOne.module.scss";

type Props = {
  products: ProductType[];
  gifts: GiftType[];
  setSelectedVariant: (data: VariantProductType) => void;
  selectedVariant: VariantProductType | null;
  nextStep: (evt: React.FormEvent) => void;
};

export const StepOne: FC<Props> = ({
  products,
  gifts,
  setSelectedVariant,
  selectedVariant,
  nextStep,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("SexChocolate");

  const scrollToButton = (bottomGap = 20) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const bottom = rect.bottom + bottomGap;

    if (bottom > window.innerHeight) {
      window.scrollBy({
        top: bottom - window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSelectVariant = (product: VariantProductType) => {
    scrollToButton();
    setSelectedVariant(product);

    if (!selectedVariant?.components.length && product.components.length) {
      setTimeout(() => {
        scrollToButton(114);
      }, 50);
    }
  };

  return (
    <form onSubmit={nextStep}>
      <ul className={styles.list}>
        {products.map((product) => {
          const quantity: number = product.variants[0].components.length
            ? product.variants[0].components[0].quantity || 1
            : 1;

          return (
            <Variant
              key={product.variants[0].id}
              active={selectedVariant?.id === product.variants[0].id}
              onSelect={() => handleSelectVariant(product.variants[0])}
              top={
                <span>
                  {quantity} {quantity > 1 ? t("boxes") : t("box")}
                </span>
              }
            >
              {quantity === 2 && (
                <span className={styles.bage}>{t("free-gift")}</span>
              )}
              {quantity === 3 && (
                <span className={styles.bage}>
                  {t("save", {
                    amount: dataUtils.formatPrice(
                      {
                        amount:
                          products[0].variants[0].price.amount * quantity -
                          product.variants[0].price.amount,
                        currencyCode: product.variants[0].price.currencyCode,
                      },
                      0
                    ),
                  })}
                </span>
              )}
              <span className={styles.price}>
                {dataUtils.formatPrice({
                  amount: product.variants[0].price.amount / quantity,
                  currencyCode: product.variants[0].price.currencyCode,
                })}
                /{t("box")}
              </span>
            </Variant>
          );
        })}
      </ul>
      <Gift gifts={gifts} isActive={!!selectedVariant?.components.length} />
      <SubmitButton
        label={t("next")}
        isActive={!!selectedVariant}
        ref={buttonRef}
        total={
          selectedVariant ? dataUtils.formatPrice(selectedVariant.price) : null
        }
      />
    </form>
  );
};
