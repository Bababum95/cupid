"use client";

import { motion, AnimatePresence } from "motion/react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import CloseIcon from "@/icons/close.svg";

import styles from "./Popup.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
};

export default function Popup({
  isOpen,
  onClose,
  children,
  size = "medium",
}: Props) {
  return ReactDOM.createPortal(
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={styles.popup}
          onClick={onClose}
          variants={{
            open: { opacity: 1, visibility: "visible" },
            closed: { opacity: 0, visibility: "hidden" },
          }}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.div
            className={classNames(styles.container, styles[size])}
            onClick={(e) => e.stopPropagation()}
            variants={{ open: { y: 0 }, closed: { y: 100 } }}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25, type: "tween" }}
          >
            <button className={styles.close} onClick={onClose}>
              <CloseIcon />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
