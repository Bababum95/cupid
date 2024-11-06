import { FC } from "react";

import styles from "./ProductLoader.module.scss";

export const ProductLoader: FC = () => {
  return (
    <li className={styles.item}>
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.description} />
      <div className={styles.bottom}>
        <div className={styles.price} />
        <div className={styles.button} />
      </div>
    </li>
  );
};
