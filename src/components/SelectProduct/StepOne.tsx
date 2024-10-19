"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { formatPrice } from "@/utils";
import { SubmitButton } from "@/components";
import type { Product } from "@/types";

import { Gift } from "./Gift";
import { Variant } from "./Variant";
import type { GiftType } from "./types";
import styles from "./StepOne.module.scss";

type Props = {
  products: Product[];
  gifts: GiftType[];
  setSelectedVariant: (data: Product) => void;
  selectedVariant: Product | null;
  nextStep: (evt: React.FormEvent) => void;
};

export const StepOne: FC<Props> = ({
  products,
  gifts,
  setSelectedVariant,
  selectedVariant,
  nextStep,
}) => {
  const t = useTranslations("SexChocolate");

  const handleSelectVariant = (product: Product) => {
    setSelectedVariant(product);
  };

  return (
    <form onSubmit={nextStep}>
      <ul className={styles.list}>
        {products.map((product) => {
          const quantity: number = product.components
            ? product.components[0][0].quantity || 1
            : 1;

          return (
            <Variant
              key={product.id}
              active={selectedVariant?.id === product.id}
              onSelect={() => handleSelectVariant(product)}
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
                  {t("save")}{" "}
                  {formatPrice(
                    {
                      amount:
                        products[0].price.amount * quantity -
                        product.price.amount,
                      currencyCode: product.price.currencyCode,
                    },
                    0
                  )}
                </span>
              )}
              <span className={styles.price}>
                {formatPrice({
                  amount: product.price.amount / quantity,
                  currencyCode: product.price.currencyCode,
                })}
                /{t("box")}
              </span>
            </Variant>
          );
        })}
      </ul>
      <Gift gifts={gifts} isActive={!!selectedVariant?.isBundle} />
      <SubmitButton
        label={t("next")}
        isActive={!!selectedVariant}
        total={selectedVariant ? formatPrice(selectedVariant.price) : undefined}
      />
    </form>
  );
};
