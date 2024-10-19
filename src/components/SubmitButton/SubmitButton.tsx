import { FC } from "react";
import { motion } from "framer-motion";

import styles from "./SubmitButton.module.scss";

type Props = {
  label: string;
  total?: string;
  isActive: boolean;
};

export const SubmitButton: FC<Props> = ({ label, total, isActive }) => {
  return (
    <button className={styles.button} disabled={!isActive}>
      <motion.span layout>{label}</motion.span>
      <span className={styles.total}>{total}</span>
    </button>
  );
};
