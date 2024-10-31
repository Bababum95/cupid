import { useTranslations } from "next-intl";

import StarIcon from "@/icons/star.svg";

import { Comment } from "./Comment";
import styles from "./Comments.module.scss";

const comments = [
  {
    name: "Lisa M.",
    rating: 5,
    date: "11/02/2024",
    review:
      "Absolut begeistert! Die Verpackung ist wunderschön und die Schokolade schmeckt fantastisch. Werde definitiv wieder bestellen!",
  },
  {
    name: "Lisa M.",
    rating: 5,
    date: "11/02/2024",
    review:
      "Absolut begeistert! Die Verpackung ist wunderschön und die Schokolade schmeckt fantastisch. Werde definitiv wieder bestellen!",
  },
  {
    name: "Lisa M.",
    rating: 5,
    date: "11/02/2024",
    review:
      "Absolut begeistert! Die Verpackung ist wunderschön und die Schokolade schmeckt fantastisch. Werde definitiv wieder bestellen!",
  },
];

export const Comments = () => {
  const t = useTranslations("Comments");

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.summary}>
        <h2 className={styles.title}>{t("reviews")}</h2>
        <div className={styles.rating}>
          <div className={styles.info}>
            <p className={styles.score}>4,9</p>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} fill={"#520C11"} />
              ))}
            </div>
            <p className={styles.count}>{t("reviews")}: 152</p>
          </div>
          <div className={styles.bar}>
            <ul>
              {[90, 8, 2, 0, 0].map((percentage, i) => (
                <li key={i} className={styles.item}>
                  <span>{5 - i}</span>
                  <span
                    className={styles.percentage}
                    style={{ backgroundSize: `${percentage}% 100%` }}
                  />
                </li>
              ))}
            </ul>
            {/* <button className={styles.button}>{t("write-review")}</button> */}
          </div>
        </div>
      </div>
      <ul
        itemScope
        itemType="https://schema.org/ItemList"
        className={styles.list}
      >
        {comments.map(({ name, review, rating, date }, i) => (
          <Comment
            key={i}
            name={name}
            review={review}
            rating={rating}
            date={date}
          />
        ))}
      </ul>
    </section>
  );
};
