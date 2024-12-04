import styles from "./Testimonials.module.scss";

export const Testimonials = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Over 1,000+ Happy Couples</h2>
      <div className={styles.testimonialGrid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.image} />
        ))}
      </div>
    </div>
  );
};
