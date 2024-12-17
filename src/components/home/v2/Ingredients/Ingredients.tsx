import { FC } from "react";
import { useTranslations } from "next-intl";

import { Slider } from "@/components/home";

import styles from "./Ingredients.module.scss";
import Image from "next/image";

type Props = {
  list: number[];
};

export const Ingredients: FC<Props> = ({ list }) => {
  const t = useTranslations("HomePage.Ingredients");

  return (
    <section className={styles.section} id="ingredients">
      <Slider title={t("title")}>
        {list.map((item) => (
          <div key={item} className={styles.item}>
            <Image
              src={`/images/home/v2/ingredients/${item}.jpg`}
              width={394}
              height={240}
              alt={t(`list.${item}.name`)}
              className={styles.image}
              quality={80}
            />
            <h3 className={styles.subtitle}>{t(`list.${item}.name`)}</h3>
            <p className={styles.property}>{t(`list.${item}.property`)}</p>
            <p className={styles.description}>
              {t.rich(`list.${item}.description`, {
                span: (chunks) => <span>{chunks}</span>,
              })}
            </p>
          </div>
        ))}
      </Slider>
    </section>
  );
};
