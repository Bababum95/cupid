"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "./Form.module.scss";

export const Form: FC = () => {
  const [value, setValue] = useState("");
  const t = useTranslations("Subscribe");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        placeholder={t("placeholder")}
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
      />
      <button className={styles.button}>{t("button")}</button>
    </form>
  );
};
