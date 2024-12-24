import { FC, useRef } from "react";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import { RadioVariant } from "@/components";
import ProtectIcon from "@/icons/protect.svg";

import { PRODUCT_VARIANTS } from "./config";
import styles from "./ProductForm.module.scss";

const CHECKOUT_DOMAIN = process.env.CHECKOUT_DOMAIN;

type Props = {
  selectedBox: string | null;
  handleChange: (id: string) => void;
  handleBuyClick: (url: string) => void;
  loading?: boolean;
  total?: {
    regular: number;
    discount: number;
  };
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

export const ProductForm: FC<Props> = ({
  selectedBox,
  handleChange,
  handleBuyClick,
  total,
  loading = false,
}) => {
  const t = useTranslations("SexChocolate");
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    if (!selectedBox) return;
    const url = linkRef.current?.href || `https://${CHECKOUT_DOMAIN}/`;

    handleBuyClick(url);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      data-event="add_to_cart"
      data-next-step="go_to_checkout"
    >
      <ul
        className={styles.list}
        role="radiogroup"
        aria-label="Product options"
      >
        {PRODUCT_VARIANTS.map(
          ({ quantity, savings, price, id, recommended }, index) => (
            <RadioVariant
              key={index}
              recommended={recommended && !selectedBox}
              active={selectedBox === id}
              onSelect={() => handleChange(id)}
              top={
                <div className={styles.wrapper}>
                  <div className={styles.info}>
                    <span className={styles.quantity}>
                      {quantity} {quantity > 1 ? t("boxes") : t("box")}
                    </span>
                    <span className={styles.experiences}>
                      {t("experiences", { count: quantity * 3 })}
                    </span>
                  </div>
                  <div className={styles.price}>
                    <span className={styles.regular}>37,00€/Box</span>
                    <span className={styles.sale}>
                      {formatPrice(price)}/{t("box")}
                    </span>
                  </div>
                </div>
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
            </RadioVariant>
          )
        )}
      </ul>
      <a
        className={classNames(styles.button, { [styles.loading]: loading })}
        href={`https://${CHECKOUT_DOMAIN}/`}
        onClick={handleSubmit}
        ref={linkRef}
      >
        <ProtectIcon />
        {t("buy-now")}
        <div className={styles.total} aria-label="Total price">
          {selectedBox && total ? (
            <>
              <span className={styles.discount}>
                {formatPrice(total.discount)}
              </span>
              <span className={styles.regular}>
                {formatPrice(total.regular)}
              </span>
            </>
          ) : (
            <span className={styles.discount}>ab 24,99€/Box</span>
          )}
        </div>
      </a>
    </form>
  );
};
