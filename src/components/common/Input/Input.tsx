import type { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return <input className={classNames(styles.input, className)} {...props} />;
};
