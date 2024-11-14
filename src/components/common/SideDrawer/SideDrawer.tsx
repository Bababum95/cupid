import { FC } from "react";
import { AnimatePresence, motion } from "motion/react";
import classNames from "classnames";
import Link from "next/link";

import LogoIcon from "@/icons/logotype.svg";

import styles from "./SideDrawer.module.scss";

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  children?: React.ReactNode;
};

export const SideDrawer: FC<Props> = ({
  title,
  onClose,
  isOpen,
  side = "right",
  children,
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={onClose}
            initial="close"
            animate="open"
            exit="close"
            key="overlay"
            variants={{ open: { opacity: 1 }, close: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            aria-label={title}
            role="complementary"
            className={classNames(styles.wrapper, styles[side])}
            initial="close"
            animate="open"
            exit="close"
            key="drawer"
            variants={{
              open: { x: 0 },
              close: { x: side === "left" ? "-100%" : "100%" },
            }}
            transition={{ duration: 0.35, type: "tween" }}
          >
            <header className={styles.header}>
              {title ? (
                <h2 className={styles.title}>{title}</h2>
              ) : (
                <Link href="/" className={styles.logo}>
                  <LogoIcon />
                </Link>
              )}
              <button
                aria-label="Close button"
                onClick={onClose}
                type="button"
                className={styles.close}
              >
                <Line rotate={45} />
                <Line rotate={-45} />
              </button>
            </header>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

type LineProps = {
  rotate: number;
};

const Line: FC<LineProps> = ({ rotate }) => {
  return (
    <motion.span
      className={styles.line}
      initial="close"
      animate="open"
      exit="close"
      key="line"
      variants={{ open: { rotate }, close: { rotate: 0 } }}
      transition={{ duration: 0.15, type: "tween", delay: 0.05 }}
    />
  );
};
