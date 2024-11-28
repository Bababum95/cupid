"use client";

import { FC, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import classNames from "classnames";

import type { CreateCartInput, VariantProductType, GiftType } from "@/types";
import { SubmitButton, Price } from "@/components";
import { dataUtils } from "@/utils";
import { useAppDispatch } from "@/hooks";
import { create as createCart } from "@/lib/slices/cart";
import { default as CheckMarkIcon } from "@/icons/checkmark.svg";

import type { SellingPlanGroupType } from "./types";
import { Variant } from "./Variant";
import styles from "./StepTwo.module.scss";

type Props = {
  mainProduct: VariantProductType;
  selectedVariant: VariantProductType;
  sellingPlans: SellingPlanGroupType[];
  gifts: GiftType[];
  locale: string;
};

export const StepTwo: FC<Props> = ({
  selectedVariant,
  mainProduct,
  sellingPlans,
  gifts,
  locale,
}) => {
  const [sellingPlanIndex, setSellingPlanIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<"subscribe" | "one-time" | null>(
    null
  );
  const t = useTranslations("SexChocolate");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const mainPrice = mainProduct.price;
  const quantity: number = selectedVariant.components.length
    ? selectedVariant.components[0].quantity || 1
    : 1;

  const sellingPlan = quantity === 3 ? sellingPlans[1] : sellingPlans[0];
  const subscribePrice = mainPrice.amount - (sellingPlan?.discount || 5);

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

  useEffect(() => {
    if (!buttonRef.current) return;
    setTimeout(() => {
      scrollToButton();
    }, 300);
  }, [buttonRef]);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!selected) return;
    setIsLoading(true);
    const input: CreateCartInput = { lines: [], discountCodes: [] };

    if (selected === "one-time") {
      input.lines.push({ merchandiseId: selectedVariant.id, quantity: 1 });
    } else {
      const giftIndex = quantity > 1 ? 1 : 0;

      input.lines.push({
        merchandiseId: mainProduct.id,
        quantity,
        sellingPlanId: sellingPlan.sellingPlans[sellingPlanIndex].id,
      });

      if (gifts[giftIndex] && gifts[giftIndex].code) {
        input.lines.push({ merchandiseId: gifts[giftIndex].id, quantity: 1 });
        input.discountCodes.push(gifts[giftIndex].code);
      }
    }

    if (quantity > 1) {
      input.lines.push({ merchandiseId: gifts[0].id, quantity: 1 });

      if (gifts[0].code) input.discountCodes.push(gifts[0].code);
    }

    const res = await dispatch(createCart({ input, locale }));

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/cart");
    } else {
      setIsLoading(false);
      console.log(res);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul className={styles.list}>
        <Variant
          active={selected === "subscribe"}
          onSelect={() => setSelected("subscribe")}
          top={
            <VariantTop
              label={t("subscribe-and-save")}
              price={`${dataUtils.formatPrice({
                amount: subscribePrice,
                currencyCode: mainPrice.currencyCode,
              })}
              /${t("box")}`}
              total={{
                amount: dataUtils.formatPrice({
                  amount: subscribePrice * quantity,
                  currencyCode: mainPrice.currencyCode,
                }),
                old: dataUtils.formatPrice({
                  amount: mainPrice.amount * quantity,
                  currencyCode: mainPrice.currencyCode,
                }),
              }}
            />
          }
        >
          <div>
            <div className={styles.badges}>
              <span className={styles.badge}>
                {t("save", {
                  amount: dataUtils.formatPrice(
                    {
                      amount: sellingPlan?.discount | 5,
                      currencyCode: mainPrice.currencyCode,
                    },
                    0
                  ),
                })}
              </span>
              <span className={styles.badge}>{t("best-value")}</span>
            </div>
            <ul className={styles.benefits}>
              <li className={styles.benefit}>
                <CheckMarkIcon />
                <p>
                  <strong>
                    {t("free-gift")}: {gifts[1]?.title} (
                    {t("limited-time-offer")})
                  </strong>
                </p>
              </li>
              <li className={styles.benefit}>
                <CheckMarkIcon />
                <p>
                  <strong>{t("guaranteed-delivery")} </strong>
                  {t("during-sell-outs")}
                </p>
              </li>
              <li className={styles.benefit}>
                <CheckMarkIcon />
                <p>
                  {t("pause-update-frequency-or")}
                  <strong> {t("cancel-anytime")}</strong>
                </p>
              </li>
              <li className={styles.benefit}>
                <CheckMarkIcon />
                <p>
                  <strong>{t("priority-support")}</strong>
                </p>
              </li>
            </ul>
            <AnimatePresence initial={false} key="content">
              {selected === "subscribe" && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  className={styles.time}
                  variants={{
                    open: { opacity: 1, height: "auto", margin: "24px 0 8px" },
                    collapsed: { opacity: 0, height: 0, margin: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <p className={styles["time-title"]}>{t("deliver-every")}</p>
                  <ul className={styles["time-list"]}>
                    {sellingPlan?.sellingPlans.map((item, index) => (
                      <li
                        className={classNames(styles["time-item"], {
                          [styles.active]: sellingPlanIndex === index,
                        })}
                        key={item.id}
                        onClick={() => setSellingPlanIndex(index)}
                      >
                        {item.options[0].value.match(/\d+/)} {t("weeks")}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Variant>
        <Variant
          active={selected === "one-time"}
          onSelect={() => setSelected("one-time")}
          top={
            <VariantTop
              label={t("one-time-purchase")}
              price={`${dataUtils.formatPrice({
                amount: selectedVariant.price.amount / quantity,
                currencyCode: mainPrice.currencyCode,
              })}
              /${t("box")}`}
              total={{
                amount: dataUtils.formatPrice({
                  amount: selectedVariant.price.amount,
                  currencyCode: mainPrice.currencyCode,
                }),
              }}
            />
          }
        />
      </ul>
      <SubmitButton
        label={t("add-to-cart")}
        isActive={!!selected}
        ref={buttonRef}
        total={
          selected
            ? dataUtils.formatPrice({
                amount:
                  selected === "subscribe"
                    ? subscribePrice * quantity
                    : selectedVariant.price.amount,
                currencyCode: mainPrice.currencyCode,
              })
            : undefined
        }
        isLoading={isLoading}
      />
    </form>
  );
};

type VariantTopProps = {
  label: string;
  price: string;
  total: {
    amount: string;
    old?: string;
  };
};

const VariantTop: FC<VariantTopProps> = ({ label, price, total }) => {
  return (
    <div className={styles.top}>
      <div>
        <p className={styles.label}>{label}</p>
        <p className={styles.price}>{price}</p>
      </div>
      <Price price={total.amount} old={total.old} />
    </div>
  );
};
