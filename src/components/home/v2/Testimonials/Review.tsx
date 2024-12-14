import type { FC } from "react";
import { useTranslations } from "next-intl";

import VerifiedIcon from "@/icons/approval-blue.svg";

import styles from "./Review.module.scss";

type Props = {
  title: string;
  content: string;
  author: string;
  date: string;
};

export const Review: FC<Props> = ({ title, content, author, date }) => {
  const t = useTranslations("HomePage.Comments");

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      <div className={styles.footer}>
        <VerifiedIcon />
        <p className={styles.author}>{author}</p>
        <div className={styles.divider} />
        <span className={styles.verified}> {t("verified")}</span>
        <time className={styles.date} dateTime={date}>
          {date}
        </time>
      </div>
    </div>
  );
};
