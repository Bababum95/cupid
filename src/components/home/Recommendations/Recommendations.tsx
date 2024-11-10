import { useTranslations } from "next-intl";
import Image from "next/image";

import { Slider } from "@/components/home";
import { getInitialsLetters } from "@/utils";
import StarIcon from "@/icons/star.svg";

import { LIST_OF_RECOMMENDATIONS } from "./config";
import styles from "./Recommendations.module.scss";

export const Recommendations = () => {
  const t = useTranslations("Recommendations");

  return (
    <section>
      <Slider title={t("title")} gap={52}>
        {LIST_OF_RECOMMENDATIONS.map(({ name, rating, image, review }, i) => (
          <div key={i} className={styles.slide}>
            <div className={styles.author}>
              <span className={styles.avatar}>{getInitialsLetters(name)}</span>
              <div>
                <p className={styles.name}>{name}</p>
                <div className={styles.stars}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <StarIcon key={i} fill={"#520C11"} />
                  ))}
                </div>
              </div>
            </div>
            <Image
              className={styles.image}
              src={image}
              width={275}
              height={352}
              alt={name}
            />
            <p className={styles.review}>{review}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};
