import { useTranslations } from "next-intl";
import Image from "next/image";

import { TAGS } from "./config";
import styles from "./Marquee.module.scss";

export const Marquee = () => {
  const t = useTranslations("HomePage.Marquee");

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {TAGS.map((tag) => (
          <li className={styles.item} key={tag}>
            <Image
              src={`/images/marquee/${tag}.png`}
              alt={t(tag)}
              width={20}
              height={20}
            />
            <span>{t(tag)}</span>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        {TAGS.map((tag) => (
          <li className={styles.item} key={tag}>
            <Image
              src={`/images/marquee/${tag}.png`}
              alt={t(tag)}
              width={20}
              height={20}
            />
            <span>{t(tag)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
