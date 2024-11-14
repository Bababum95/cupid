import { FC } from "react";
import { motion } from "motion/react";
import classNames from "classnames";

import styles from "./SubmitButton.module.scss";

type Props = {
  label: string;
  total?: string | null;
  isActive: boolean;
  isLoading?: boolean;
};

export const SubmitButton: FC<Props> = ({
  label,
  total,
  isActive,
  isLoading,
}) => {
  return (
    <button
      className={classNames(styles.button, { [styles.loading]: isLoading })}
      disabled={!isActive}
    >
      <motion.span layout>{label}</motion.span>
      {total && <span className={styles.total}>{total}</span>}
    </button>
  );
};
