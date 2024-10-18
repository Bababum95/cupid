import { FC } from "react";

import styles from "./Price.module.scss";

type Props = {
  price: string;
  old?: string;
};

export const Price: FC<Props> = ({ price, old }) => {
  return (
    <p className={styles.price}>
      <span>{price}</span>
      {old && <span className={styles.old}>{old}</span>}
    </p>
  );
};
