import { FC } from "react";

import StarIcon from "@/icons/star.svg";

import styles from "./Rating.module.scss";

type Props = {
  text: string;
};

export const Rating: FC<Props> = ({ text }) => {
  return (
    <div className={styles.rating}>
      <div className={styles.stars} aria-label="5 out of 5 stars rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            fill="#DBAD3A"
            width={19}
            height={19}
            viewBox="0 0 24 24"
          />
        ))}
      </div>
      <p>{text}</p>
    </div>
  );
};
