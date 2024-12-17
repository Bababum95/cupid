"use client";

import { FC, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { dataUtils } from "@/utils";
import { SubmitButton, RadioVariant } from "@/components";
import type { ProductType, VariantProductType, GiftType } from "@/types";

import { Gift } from "./Gift";
import styles from "./StepOne.module.scss";

type Props = {
  products: ProductType[];
  gifts: GiftType[];
  setSelectedVariant: (data: VariantProductType) => void;
  selectedVariant: VariantProductType | null;
  nextStep: () => Promise<void>;
};

export const StepOne: FC<Props> = ({
  products,
  gifts,
  setSelectedVariant,
  selectedVariant,
  nextStep,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    await nextStep();
    // setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className={styles.list}>
        {products.map((product) => {
          const quantity: number = product.variants[0].components.length
            ? product.variants[0].components[0].quantity || 1
            : 1;

          return (
            <RadioVariant
              key={product.variants[0].id}
              active={selectedVariant?.id === product.variants[0].id}
              onSelect={() => handleSelectVariant(product.variants[0])}
              recommended={quantity === 2 && !selectedVariant}
              top={
                <span>
                  {quantity} {quantity > 1 ? t("boxes") : t("box")}
                </span>
              }
            >
              {quantity === 2 && (
                <span className={styles.bage}>
                  {t("free-gift", { count: 1 })}
                </span>
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
            </RadioVariant>
          );
        })}
      </ul>
      <Gift gifts={gifts} isActive={!!selectedVariant?.components.length} />
      <SubmitButton
        label={t("next")}
        isActive={!!selectedVariant}
        isLoading={isLoading}
        ref={buttonRef}
        total={
          selectedVariant ? dataUtils.formatPrice(selectedVariant.price) : null
        }
      />
    </form>
  );
};
