"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import type { CommentType } from "@/types";
import { Button } from "@/components";
import StarIcon from "@/icons/star.svg";
import { useGetCommentsQuery } from "@/lib/slices/api";

import { Comment } from "./Comment";
import { NewComment } from "./NewComment";
import styles from "./Comments.module.scss";

const BASE_URL = process.env.BASE_URL;

export const Comments = () => {
  const t = useTranslations("HomePage.Comments");
  const [offset, setOffset] = useState<string>("0");
  const [comments, setComments] = useState<CommentType[]>([]);
  const { data, isLoading } = useGetCommentsQuery({
    pageId: "home",
    offset,
  });

  useEffect(() => {
    if (data?.comments.length) {
      setComments((prev) => [...prev, ...data.comments]);
    }
  }, [data]);

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.summary}>
        <h2 className={styles.title}>{t("reviews")}</h2>
        <div className={styles.rating}>
          <div className={styles.info}>
            <p className={styles.score}>4,9</p>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  fill={"#520C11"}
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                />
              ))}
            </div>
            <p className={styles.count}>{t("reviews")}: 157</p>
          </div>
          <ul className={styles.bar}>
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
          <NewComment />
        </div>
      </div>
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
        {comments.map(({ name, message, rating, createdAt, _id }) => (
          <Comment
            key={_id}
            name={name}
            review={message}
            rating={rating}
            date={createdAt}
          />
        ))}
        {data && data.total > comments.length && (
          <Button
            variant="secondary"
            onClick={() => setOffset(comments.length.toString())}
            className={styles.button}
            loading={isLoading}
          >
            {t("load-more")}
          </Button>
        )}
      </ul>
    </section>
  );
};
