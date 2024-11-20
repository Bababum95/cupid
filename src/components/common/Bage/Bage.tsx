import { FC } from "react";
import classNames from "classnames";

import styles from "./Bage.module.scss";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
};

export const Bage: FC<Props> = ({
  children,
  variant = "primary",
  size = "medium",
}) => {
  return (
    <span className={classNames(styles.bage, styles[variant], styles[size])}>
      {children}
    </span>
  );
};
