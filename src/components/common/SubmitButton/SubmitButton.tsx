import { forwardRef } from "react";
import { motion } from "motion/react";
import classNames from "classnames";

import styles from "./SubmitButton.module.scss";

type Props = {
  label: string;
  total?: string | null;
  isActive: boolean;
  isLoading?: boolean;
  Element?: React.ElementType;
  href?: string;
} & React.DetailedHTMLProps<
  React.HtmlHTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const SubmitButton = forwardRef<HTMLElement, Props>(
  (
    { label, total, isActive, isLoading, Element = "button", ...props },
    ref
  ) => {
    return (
      <Element
        className={classNames(styles.button, { [styles.loading]: isLoading })}
        disabled={!isActive}
        ref={ref}
        {...props}
      >
        <motion.span layout>{label}</motion.span>
        {total && <span className={styles.total}>{total}</span>}
      </Element>
    );
  }
);

SubmitButton.displayName = "SubmitButton";
