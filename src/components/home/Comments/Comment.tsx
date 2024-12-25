import { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { getInitialsLetters, dataUtils } from "@/utils";
import StarIcon from "@/icons/star.svg";
import VerifiedIcon from "@/icons/approval.svg";

import styles from "./Comment.module.scss";

type Props = {
  name: string;
  rating: number;
  review: string;
  date: string;
  photos?: string[];
  accentColor: string;
  onClickVerified: () => void;
};

export const Comment: FC<Props> = ({
  name,
  rating,
  review,
  date,
  photos,
  accentColor,
  onClickVerified,
}) => {
  const t = useTranslations("HomePage.Comments");

  return (
    <li
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/Review"
      className={styles.item}
    >
      <div className={styles.header}>
        <div
          className={styles.author}
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <span className={styles.avatar}>{getInitialsLetters(name)}</span>
          <p className={styles.name} itemProp="name">
            {name}
          </p>
        </div>

        <div
          itemProp="reviewRating"
          itemScope
          itemType="https://schema.org/Rating"
        >
          <meta itemProp="worstRating" content="1" />
          <span
            className={styles.stars}
            itemProp="ratingValue"
            content={rating.toString()}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                fill={i < rating ? accentColor : "#1a1a1a"}
                viewBox="0 0 24 24"
              />
            ))}
          </span>
          <meta itemProp="bestRating" content="5" />
        </div>
      </div>
      {!!photos?.length && (
        <div className={styles.photos}>
          {photos.map((photo, i) => (
            <Image
              key={i}
              src={photo}
              width={275}
              height={352}
              alt={name}
              className={styles.image}
            />
          ))}
        </div>
      )}
      <p className={styles.review} itemProp="reviewBody">
        {review}
      </p>

      <div className={styles.footer}>
        <button className={styles.button} onClick={onClickVerified}>
          <VerifiedIcon width={24} height={24} />
          {t("verified")}
        </button>
        <span>/</span>
        <time itemProp="datePublished" dateTime={date}>
          {dataUtils.formatDateIntl(date)}
        </time>
      </div>
    </li>
  );
};
