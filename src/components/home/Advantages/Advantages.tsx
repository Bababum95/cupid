import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./Advantages.module.scss";

const colOne = [
  "heightens-pleasure",
  "natural-safe",
  "boosts-performance",
] as const;
const colTwo = ["science-backed", "trusted", "fast"] as const;

export const Advantages = () => {
  const t = useTranslations("Advantages");
  return (
    <div className={styles.block}>
      <ul className={styles.list}>
        {colOne.map((item) => (
          <li key={item} className={styles.item}>
            <p className={styles.title}>{t(item)}</p>
            <p className={styles.text}>{t(`${item}-text`)}</p>
          </li>
        ))}
      </ul>
      <Image
        src="/images/advantages.png"
        alt="Cupid Aphrodisiac Chocolate"
        width={410}
        height={410}
        className={styles.image}
        quality={90}
      />
      <ul className={styles.list}>
        {colTwo.map((item) => (
          <li key={item} className={styles.item}>
            <p className={styles.title}>{t(item)}</p>
            <p className={styles.text}>{t(`${item}-text`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
