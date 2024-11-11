"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import styles from "./Form.module.scss";

export const Form: FC = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Subscribe");

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
    });

    const data = await res.json();
    console.log(data);
    setIsLoading(false);
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
      <button
        className={classNames(styles.button, { [styles.loading]: isLoading })}
      >
        {t("button")}
      </button>
    </form>
  );
};
