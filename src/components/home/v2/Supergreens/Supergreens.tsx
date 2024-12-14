import { useTranslations } from "next-intl";
import Image from "next/image";

import { data } from "./config";
import styles from "./Supergreens.module.scss";

export const Supergreens = () => {
  const t = useTranslations("HomePage.V2.Supergreens");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t("title")}</h2>
        <ul className={styles.list}>
          {data.map((item, index) => (
            <li className={styles.item} key={index}>
              <h3 className={styles.subtitle}>{t(`list.${item}.title`)}</h3>
              <div className={styles.description}>
                {t(`list.${item}.description`)}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Image
        className={styles.image}
        src="/images/advantages.png"
        alt="Supergreens product showcase"
        width={500}
        height={400}
      />
    </div>
  );
};
