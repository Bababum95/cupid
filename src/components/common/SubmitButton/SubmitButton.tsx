import { forwardRef } from "react";
import { motion } from "motion/react";
import classNames from "classnames";

import styles from "./SubmitButton.module.scss";

type Props = {
  label: string;
  total?: string | null;
  isActive: boolean;
  isLoading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  ({ label, total, isActive, isLoading, ...props }, ref) => {
    return (
      <button
        className={classNames(styles.button, { [styles.loading]: isLoading })}
        disabled={!isActive}
        ref={ref}
        {...props}
      >
        <motion.span layout>{label}</motion.span>
        {total && <span className={styles.total}>{total}</span>}
      </button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";
