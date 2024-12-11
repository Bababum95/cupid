import { FC } from "react";
import { useTranslations } from "next-intl";

import { RadioVariant } from "@/components";

import { PRODUCT_VARIANTS } from "./config";
import styles from "./ProductForm.module.scss";

type Props = {
  selectedBox: string | null;
  handleChange: (id: string) => void;
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
        {PRODUCT_VARIANTS.map(({ quantity, savings, price, id }, index) => (
          <RadioVariant
            key={index}
            active={selectedBox === id}
            onSelect={() => handleChange(id)}
            top={
              <span>
                {quantity} {quantity > 1 ? t("boxes") : t("box")}
              </span>
            }
          >
            {savings && (
              <div className={styles.bages}>
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
              <span className={styles.experiences}>
                {t("experiences", { count: quantity * 3 })}
              </span>
              <span className={styles.price}>
                {price}/{t("box")}
              </span>
            </div>
          </RadioVariant>
        ))}
      </ul>
      <button className={styles.button} disabled={!selectedBox}>
        {t("buy-now")}
      </button>
    </form>
  );
};
