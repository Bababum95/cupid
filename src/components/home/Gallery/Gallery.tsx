import { useTranslations } from "next-intl";
import Image from "next/image";
// import classNames from "classnames";

import styles from "./Gallery.module.scss";

export const Gallery = () => {
  const t = useTranslations("HomePage");

  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <h2>{t("born-from-love")}</h2>
        <p>{t("born-from-love-text")}</p>
      </div>
      <div>
        <div className={styles.first}>
          <Image
            src="/images/chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={600}
            className={styles.image}
          />
          <Image
            src="/images/chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={600}
            className={styles.image}
          />
          <Image
            src="/images/chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={600}
            className={styles.image}
          />
          <Image
            src="/images/chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={600}
            className={styles.image}
          />
        </div>
        <div className={styles.last}>
          <Image
            src="/images/chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={600}
            className={styles.image}
          />
          <Image
            src="/images/chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={600}
            className={styles.image}
          />
          <Image
            src="/images/chocolate.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={1440}
            height={600}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};
