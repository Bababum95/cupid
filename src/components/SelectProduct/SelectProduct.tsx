"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { Product } from "@/types";
import { formatPrice } from "@/utils";

import { Variant } from "./Variant";
import styles from "./SelectProduct.module.scss";

type Props = {
  products: Product[];
};

export const SelectProduct: FC<Props> = ({ products }) => {
  const [selectedVariant, setSelectedVariant] = useState<Product | null>(null);
  const t = useTranslations("SexChocolate");

  const handleSelectVariant = (product: Product) => {
    setSelectedVariant(product);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.prewiew}>
        <div className={styles.bages}>
          <span className={styles.bage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={11}
              height={11}
              viewBox="0 0 11 11"
              fill="none"
            >
              <path
                d="M3.29737 0C3.01496 0 2.78575 0.229209 2.78575 0.511628C2.78575 0.794047 3.01496 1.02326 3.29737 1.02326H3.55319V3.33557C3.55319 3.75818 3.42523 4.1646 3.18246 4.51072L0.269576 8.6642C-0.0491683 9.11904 -0.088176 9.70813 0.16815 10.2011C0.424475 10.694 0.929064 11 1.48469 11H9.20308C9.75871 11 10.2628 10.694 10.5191 10.2011C10.7754 9.70813 10.7369 9.11954 10.4182 8.6647L7.50531 4.51072C7.26255 4.1646 7.13458 3.75818 7.13458 3.33557V1.02326H7.3904C7.67282 1.02326 7.90203 0.794047 7.90203 0.511628C7.90203 0.229209 7.67282 0 7.3904 0H3.29737ZM4.57644 1.02326H6.11133V3.33557C6.11133 3.87535 6.25237 4.397 6.51853 4.86047H4.16924C4.43538 4.39686 4.57644 3.87532 4.57644 3.33557V1.02326ZM3.46925 5.88372H7.21902L9.5803 9.25227C9.72509 9.45871 9.65041 9.65423 9.61178 9.72892C9.5729 9.80337 9.45531 9.97674 9.20308 9.97674H1.48469C1.23246 9.97674 1.11487 9.80337 1.07599 9.72892C1.03736 9.65448 0.962676 9.45897 1.10747 9.25227L3.46925 5.88372ZM4.32063 6.65116C4.03796 6.65116 3.809 6.88012 3.809 7.16279C3.809 7.44547 4.03796 7.67442 4.32063 7.67442C4.6033 7.67442 4.83226 7.44547 4.83226 7.16279C4.83226 6.88012 4.6033 6.65116 4.32063 6.65116ZM6.23923 7.4186C5.74475 7.4186 5.34389 7.81947 5.34389 8.31395C5.34389 8.80844 5.74475 9.2093 6.23923 9.2093C6.73372 9.2093 7.13458 8.80844 7.13458 8.31395C7.13458 7.81947 6.73372 7.4186 6.23923 7.4186Z"
                fill="white"
              />
            </svg>
            {t("bage-1")}
          </span>
          <span className={styles.bage}>{t("bage-2")}</span>
        </div>
        <Image
          src={
            selectedVariant
              ? selectedVariant.images![0].url
              : products[0].images![0].url
          }
          alt={products[0].title}
          width={550}
          height={520}
          priority
        />
      </div>
      <div className={styles.summary}>
        <h2 className={styles.h2}>{t("title")}</h2>
        <form className={styles.form}>
          <ul className={styles.list}>
            {products.map((product) => (
              <Variant
                key={product.id}
                active={selectedVariant?.id === product.id}
                onSelect={() => handleSelectVariant(product)}
                price={product.price}
                count={
                  product.isBundle ? product.components![0][0].quantity! : 1
                }
              />
            ))}
          </ul>
          <button className={styles.button}>
            <span>{t("next")}</span>
            {selectedVariant && (
              <span className={styles.total}>
                {t("total")}: {formatPrice(selectedVariant.price)}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
