"use client";

import { useState, type FC } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components";
import { useComments } from "@/hooks";

import { Comment } from "./Comment";
import { NewComment } from "./NewComment";
import { AverageRating } from "./AverageRating";
import { VerifiedPopup } from "./VerifiedPopup";
import { calculatePercentage, getAverageRating } from "./utils";
import styles from "./Comments.module.scss";
import classNames from "classnames";

const BASE_URL = process.env.BASE_URL;

type Props = {
  accentColor?: string;
};

export const Comments: FC<Props> = ({ accentColor = "#520C11" }) => {
  const t = useTranslations("HomePage.Comments");
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const {
    comments,
    rating,
    loadMore,
    isFetching,
    totalComments,
    filterByRating,
  } = useComments("home");

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.summary}>
        <h2 className={styles.title}>{t("reviews")}</h2>
        <div className={styles.rating}>
          <AverageRating
            t={t}
            total={rating && rating.total * 3}
            accentColor={accentColor}
            rating={rating && getAverageRating(rating)}
          />
          <ul className={styles.bar}>
            {rating &&
              Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className={classNames(styles.item, {
                    [styles.empty]: !rating[5 - i],
                  })}
                  onClick={() => filterByRating(5 - i)}
                >
                  <span>{5 - i}</span>
                  <span
                    className={styles.percentage}
                    style={{
                      backgroundSize: `${calculatePercentage(
                        rating[5 - i],
                        rating.total
                      )}% 100%`,
                      backgroundImage: `linear-gradient(${accentColor}, ${accentColor})`,
                    }}
                  />
                </li>
              ))}
          </ul>
          <NewComment accentColor={accentColor} />
        </div>
      </div>
      {comments.length && (
        <ul
          itemScope
          itemType="https://schema.org/ItemList"
          itemProp="review"
          className={styles.list}
        >
          <div
            itemProp="itemReviewed"
            itemScope
            itemType="https://schema.org/Product"
          >
            <meta itemProp="name" content="Cupid Chocolate" />
            <meta itemProp="brand" content="Cupid" />
            <link itemProp="url" href={`${BASE_URL}/sex-chocolate`} />
          </div>
          {comments.map(({ name, message, rating, createdAt, _id, photos }) => (
            <Comment
              key={_id}
              name={name}
              review={message}
              rating={rating}
              date={createdAt}
              photos={photos}
              accentColor={accentColor}
              onClickVerified={() => setPopupIsOpen(true)}
            />
          ))}
          {totalComments > comments.length && (
            <Button
              variant="secondary"
              onClick={loadMore}
              className={styles.button}
              loading={isFetching}
            >
              {t("load-more")}
            </Button>
          )}
        </ul>
      )}
      <VerifiedPopup
        isOpen={popupIsOpen}
        onClose={() => setPopupIsOpen(false)}
      />
    </section>
  );
};
