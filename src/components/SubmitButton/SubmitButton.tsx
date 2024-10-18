import { FC } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import styles from "./SubmitButton.module.scss";

type Props = {
  label: string;
  total?: string;
  isActive: boolean;
};

export const SubmitButton: FC<Props> = ({ label, total, isActive }) => {
  const t = useTranslations("Common");

  return (
    <button className={styles.button} disabled={!isActive}>
      <motion.span layout>{label}</motion.span>
      <span className={styles.total}>{total && `${t("total")}: ${total}`}</span>
    </button>
  );
};
