import { FC } from "react";
import { useTranslations } from "next-intl";

import { RadioVariant } from "@/components";

import { PRODUCT_VARIANTS } from "./config";
import styles from "./ProductForm.module.scss";

type Props = {
  selectedBox: number;
  handleChange: (index: number) => void;
  handleBuyClick: () => void;
};

export const ProductForm: FC<Props> = ({
  selectedBox,
  handleChange,
  handleBuyClick,
}) => {
  const t = useTranslations("SexChocolate");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleBuyClick();
  };



  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul
        className={styles.list}
        role="radiogroup"
        aria-label="Product options"
      >
        {PRODUCT_VARIANTS.map(
          ({ quantity, savings, price, experiences }, index) => (
            <RadioVariant
              key={index}
              active={selectedBox === index}
              onSelect={() => handleChange(index)}
              top={
                <span>
                  {quantity} {quantity > 1 ? t("boxes") : t("box")}
                </span>
              }
            >
              {savings && (
                <div
                  className={styles.bages}
                  aria-label={`Save ${savings.percentage}${
                    savings.gifts
                      ? ` plus ${savings.gifts} free gift${
                          savings.gifts > 1 ? "s" : ""
                        }`
                      : ""
                  }`}
                >
                  <span className={styles.save}>
                    {t("save", {
                      amount: savings.percentage,
                    })}
                  </span>
                  {savings.gifts && (
                    <span className={styles.gift}>
                      +{" "}
                      {t("free-gift", {
                        count: savings.gifts,
                      })}
                    </span>
                  )}
                </div>
              )}
              <div className={styles.info}>
                <span className={styles.experiences}>{experiences}</span>
                <span className={styles.price}>
                  {price}/{t("box")}
                </span>
              </div>
            </RadioVariant>
          )
        )}
      </ul>

      <button className={styles.button}>Buy now</button>
    </form>
  );
};
