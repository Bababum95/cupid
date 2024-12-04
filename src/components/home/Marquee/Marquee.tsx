import { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./Marquee.module.scss";

type Props = {
  list: string[];
};

export const Marquee: FC<Props> = ({ list }) => {
  const t = useTranslations("HomePage.features");

  if (!list || !list.length) return null;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {list.map((tag, index) => (
          <li className={styles.item} key={`${tag}-${index}`}>
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
        {list.map((tag, index) => (
          <li className={styles.item} key={`${tag}-${index}-duplicate`}>
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
