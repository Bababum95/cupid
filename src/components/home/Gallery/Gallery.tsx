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
      <div className={styles.row}>
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={133}
          height={278}
          className={styles.image}
        />
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={430}
          height={278}
          className={styles.image}
        />
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={320}
          height={278}
          className={styles.image}
        />
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={498}
          height={278}
          className={styles.image}
        />
      </div>
      <div className={styles.row}>
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={400}
          height={278}
          className={styles.image}
        />
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={602}
          height={278}
          className={styles.image}
        />
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={400}
          height={278}
          className={styles.image}
        />
      </div>
    </section>
  );
};
