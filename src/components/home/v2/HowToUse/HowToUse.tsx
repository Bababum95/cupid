import { useTranslations } from "next-intl";
import Image from "next/image";

import { Slider } from "@/components/home";

import styles from "./HowToUse.module.scss";

export const HowToUse = () => {
  const t = useTranslations("HomePage.V2.HowToUse");

  return (
    <Slider title={t("title")} controller={false} loop={false}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.item}>
          <Image
            src={`/images/home/v2/how-to-use/${i + 1}.jpg`}
            width={394}
            height={240}
            alt={t(`steps.${i}.title`)}
            className={styles.image}
            quality={80}
          />
          <p className={styles.step}>{t(`step`, { step: i + 1 })}</p>
          <h3 className={styles.subtitle}>{t(`steps.${i}.title`)}</h3>
          <p className={styles.description}>{t(`steps.${i}.description`)}</p>
        </div>
      ))}
    </Slider>
  );
};
