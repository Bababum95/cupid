import { FC } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  loading?: boolean;
};

export const Button: FC<
  Props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = "primary", loading, className, ...props }) => (
  <button
    className={classNames(styles.button, styles[variant], className, {
      [styles.loading]: loading,
    })}
    {...props}
  >
    {children}
  </button>
);
