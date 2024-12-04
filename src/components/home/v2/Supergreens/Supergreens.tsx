import { data } from "./config";
import styles from "./Supergreens.module.scss";

export const Supergreens = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h2 className={styles.mainTitle}>Das ultimative Supergreens Pulver.</h2>
        <div className={styles.featuresContainer}>
          {data.map(({ title, description }, index) => (
            <div className={styles.featureContainer} key={index}>
              <h3 className={styles.featureTitle}>{title}</h3>
              <div className={styles.featureDescription}>{description}</div>
            </div>
          ))}
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab0780b4ab74a6242a6a249ab17e23efb74d1e1558a2c34a83ba8ea9b363ff3b?placeholderIfAbsent=true&apiKey=088c19ac2d1b43cc829ac505698cd511"
        alt="Supergreens product showcase"
        className={styles.productImage}
      />
    </div>
  );
};
