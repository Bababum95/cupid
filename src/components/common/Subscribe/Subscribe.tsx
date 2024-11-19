import { useTranslations } from "next-intl";
import Image from "next/image";

import { Form } from "./Form";
import styles from "./Subscribe.module.scss";

export const Subscribe = () => {
  const t = useTranslations("Subscribe");

  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <div>
          <Image
            src="/images/email.jpg"
            alt="Cupid Aphrodisiac Chocolate"
            width={552}
            height={232}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{t("title")}</h3>
          <Form />
          <p className={styles.description}>
            {t.rich("description", {
              a: (children) => <a href="/privacy-policy">{children}</a>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
