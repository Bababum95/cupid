"use client";

import styles from "./HappyCouples.module.scss";

export const HappyCouples = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Over 1,000+ Happy Couples</h2>
      <div className={styles.images}>
        <div className={styles.row}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.image} />
          ))}
        </div>
      </div>
    </div>
  );
};
