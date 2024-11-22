import { useTranslations } from "next-intl";

import StarIcon from "@/icons/star.svg";

import { Comment } from "./Comment";
// import { NewComment } from "./NewComment";
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
    name: "Daniel W.",
    rating: 5,
    date: "11/01/2024",
    review:
      "War zuerst skeptisch, aber es hat wirklich etwas Besonderes zu unserem Abend beigetragen. Sehr empfehlenswert!",
  },
  {
    name: "Sophie K.",
    rating: 5,
    date: "10/31/2024",
    review:
      "Das perfekte Geschenk für meinen Partner. Wir haben es beide sehr genossen. Werde auf jeden Fall wieder kaufen!",
  },
  {
    name: "Alex H.",
    rating: 5,
    date: "10/30/2024",
    review:
      "Toller Geschmack und spürbare Wirkung. Kam schnell und diskret an. Danke!",
  },
  {
    name: "Emma S.",
    rating: 5,
    date: "10/29/2024",
    review:
      "Wunderschöne Verpackung und köstliche Schokolade. Hat unseren Date-Abend besonders gemacht.",
  },
  {
    name: "Tom R.",
    rating: 5,
    date: "10/28/2024",
    review:
      "Habe keinen großen Unterschied bemerkt, aber die Schokolade war lecker. Werde es vielleicht nochmal versuchen.",
  },
  // {
  //   name: "Marie L.",
  //   rating: 5,
  //   date: "11/02/2024",
  //   review:
  //     "Tolles Produkt! Es hat wirklich die Stimmung gesetzt. Mein Partner und ich hatten einen wundervollen Abend.",
  // },
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
            {/* <NewComment /> */}
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
