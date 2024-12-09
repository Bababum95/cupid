import { useTranslations } from "next-intl";

import { Slider } from "@/components/home";

import styles from "./HowToUse.module.scss";

export const HowToUse = () => {
  const t = useTranslations("HomePage.V2.HowToUse");

  return (
    <Slider title={t("title")} controller={false} loop={false}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.image} />
          <h3 className={styles.subtitle}>{t(`steps.${i}.title`)}</h3>
          <p className={styles.description}>{t(`steps.${i}.description`)}</p>
        </div>
      ))}
    </Slider>
  );
};
