import { FC } from "react";
import { useTranslations } from "next-intl";

import styles from "./Content.module.scss";

type Props = {
  name: string;
  quontity: number;
};

export const Content: FC<Props> = ({ name, quontity }) => {
  const t = useTranslations(name);

  return (
    <div className={styles.wrapper}>
      {Array.from({ length: quontity }).map((_, i) => (
        <div key={i} id={`${i + 1}`} className={styles.section}>
          {i === 0 ? (
            <h1 className={styles.title}>{t(`${i + 1}`)}</h1>
          ) : (
            <h2 className={styles.title}>{t(`${i + 1}`)}</h2>
          )}
          <div className={styles.content}>
            {t.rich(`${i + 1}-content`, {
              p: (chunks) => <p>{chunks}</p>,
              ul: (chunks) => <ul>{chunks}</ul>,
              ol: (chunks) => <ol>{chunks}</ol>,
              li: (chunks) => <li>{chunks}</li>,
              a: (chunks) => <a href={chunks as string} rel="noreferrer nofollow" target="_blank">{chunks}</a>,
              strong: (chunks) => <strong>{chunks}</strong>,
              span: (chunks) => <span>{chunks}</span>,
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
