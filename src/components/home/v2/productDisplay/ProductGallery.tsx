import React from "react";

import styles from "./ProductGallery.module.scss";

export const ProductGallery = () => {
  return (
    <div className={styles.wrapper} role="region" aria-label="Product images">
      <div className={styles.mainImage} />

      <div className={styles.thumbnails}>
        <div className={styles.thumbnail} />
        <div className={styles.thumbnail} />
        <div className={styles.thumbnail} />
      </div>
    </div>
  );
};
