import { useTranslations } from "next-intl";
import Image from "next/image";

import { Form } from "./Form";
import styles from "./Subscribe.module.scss";

export const Subscribe = () => {
  const t = useTranslations("Subscribe");

  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <Image
          src="/images/chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={552}
          height={232}
          className={styles.image}
        />
        <div>
          <h3 className={styles.title}>{t("title")}</h3>
          <Form />
          <p className={styles.description}>
            {t.rich("description", {
              a: (children) => <a href="#">{children}</a>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
