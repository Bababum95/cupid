import { FC } from "react";
import { useTranslations } from "next-intl";

import styles from "./NutritionalDrawerContent.module.scss";
import { nutritionalInformationTable } from "./config";

export const NutritionalDrawerContent: FC = () => {
  const t = useTranslations("NutritionalDrawerContent");

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.text}>
          <strong className={styles.label}>{t("suggested-use")}:</strong>
          <br />
          {t("suggested-use-text")}
        </p>
        <p className={styles.text}>{t("suggested-use-text-2")}</p>
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <td>{t("nutritional-information")}</td>
              <td>{t("per")} 100 g</td>
              <td>
                {t("per")} {t("portion")} (15g)
              </td>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {nutritionalInformationTable.map((row, index) => (
              <tr key={index}>
                <td>{t(row[0])}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.wrapper}>
        <p className={styles.text}>
          <strong className={styles.label}>{t("ingredients")}:</strong>
          <br />
          {t("ingredients-text")}
        </p>
      </div>
      <div className={styles.wrapper}>
        <p className={styles.text}>
          <strong className={styles.label}>{t("warning")}:</strong>
          <br />
          {t("warning-text")}
        </p>
        <ul className={styles.list}>
          {[1, 2, 3].map((i) => (
            <li key={i}>{t(`warning-item-${i}`)}</li>
          ))}
        </ul>
        <p className={styles.text}>
          {t("warning-text-2")}
          <br />
          <span>{t("may-contain-traces")}</span>
        </p>
      </div>
    </>
  );
};
