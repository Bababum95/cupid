"use client";

import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variant } from "motion/react";

import type { GiftType } from "@/types";
import { Input, Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { discountCodeUpdate } from "@/lib/slices/cart";
import AddIcon from "@/icons/plus.svg";

import styles from "./DiscountCode.module.scss";

const HIDDEN: Variant = {
  opacity: 0,
  visibility: "hidden",
  display: "none",
};

const VISIBLE: Variant = {
  opacity: 1,
  visibility: "visible",
};

type Props = {
  gifts?: GiftType[];
};

export const DiscountCode: FC<Props> = ({ gifts }) => {
  const [status, setStatus] = useState<"closed" | "form" | "code" | "loading">(
    "loading"
  );
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await dispatch(discountCodeUpdate({ code: value, add: true }));

    localStorage.setItem("userDiscountCode", value);
    console.log(cart, res);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(cart, gifts);
  }, [cart, gifts]);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence initial={false}>
        <motion.div
          className={styles.opener}
          onClick={() => setStatus("form")}
          variants={{ open: { ...VISIBLE, display: "flex" }, closed: HIDDEN }}
          animate={status === "closed" ? "open" : "closed"}
          key="opener"
          transition={{ duration: 0.2, type: "tween" }}
        >
          <p>Have a Discount Code?</p>
          <span className={styles.icon}>
            <AddIcon />
          </span>
        </motion.div>
        <motion.div
          className={styles.content}
          variants={{ open: { ...VISIBLE, display: "block" }, closed: HIDDEN }}
          animate={status === "form" ? "open" : "closed"}
          key="content"
          transition={{ duration: 0.2, type: "tween", delay: 0.2 }}
        >
          <p className={styles.label}>Promocode</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button
              loading={isLoading}
              type="submit"
              variant="secondary"
              disabled={value.trim() === ""}
              className={styles.button}
            >
              Apply
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
