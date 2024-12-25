import type { FC } from "react";

import StarIcon from "@/icons/star.svg";

import styles from "./Comments.module.scss";

type Props = {
  accentColor: string;
  t: (key: string) => string;
  total?: number;
  rating?: string;
};

/**
 * AverageRating component displays the average rating with star icons and total review count
 * @component
 * @param {Props} props - Component props
 * @param {string} props.accentColor - The color to be used for the star icons
 * @param {function} props.t - Translation function
 * @param {number} [props.total] - Total number of reviews
 * @param {string} [props.rating] - Average rating value
 * @returns {JSX.Element} Rendered component
 */
export const AverageRating: FC<Props> = ({
  accentColor,
  t,
  total,
  rating,
}): JSX.Element => {
  return (
    <div className={styles.info}>
      <p className={styles.score}>{rating}</p>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            fill={accentColor}
            width={15}
            height={15}
            viewBox="0 0 24 24"
          />
        ))}
      </div>
      <p className={styles.count}>
        {t("reviews")}: {total}
      </p>
    </div>
  );
};
