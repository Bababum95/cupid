import Image from "next/image";

import { data } from "./config";
import styles from "./Supergreens.module.scss";

export const Supergreens = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Das ultimative Supergreens Pulver.</h2>
        <ul className={styles.list}>
          {data.map(({ title, description }, index) => (
            <li className={styles.item} key={index}>
              <h3 className={styles.subtitle}>{title}</h3>
              <div className={styles.description}>{description}</div>
            </li>
          ))}
        </ul>
      </div>
      <Image
        className={styles.image}
        src="/images/advantages.png"
        alt="Supergreens product showcase"
        width={500}
        height={400}
      />
    </div>
  );
};
