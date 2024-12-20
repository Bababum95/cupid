"use client";

import { FC } from "react";

import ClipBoardIcon from "@/icons/clipboard.svg";

import styles from "./ClipBoardButton.module.scss";

type Props = {
  value: string;
};

export const ClipBoardButton: FC<Props> = ({ value }) => {
  return (
    <button
      className={styles.button}
      onClick={() => navigator.clipboard.writeText(value)}
    >
      <ClipBoardIcon />
    </button>
  );
};
