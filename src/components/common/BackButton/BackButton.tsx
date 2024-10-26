"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { default as BackIcon } from "@/icons/back.svg";

import styles from "./BackButton.module.scss";

export const BackButton: FC = () => {
  const t = useTranslations("Common");
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={styles.button}>
      <BackIcon />
      {t("back")}
    </button>
  );
};
