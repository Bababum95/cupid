"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion, type Variant } from "motion/react";

import { Input, Button } from "@/components";
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

export const DiscountCode: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(value);
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence initial={isOpen}>
        <motion.div
          className={styles.opener}
          onClick={() => setIsOpen(!isOpen)}
          variants={{ open: HIDDEN, closed: { ...VISIBLE, display: "flex" } }}
          animate={isOpen ? "open" : "closed"}
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
          animate={isOpen ? "open" : "closed"}
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
