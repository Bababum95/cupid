import { FC } from "react";

import styles from "./Price.module.scss";
import classNames from "classnames";

type Props = {
  price: string | null;
  old?: string | null;
  left?: boolean;
};

export const Price: FC<Props> = ({ price, old, left }) => {
  return (
    <p className={classNames(styles.price, { [styles.left]: left })}>
      <span>{price}</span>
      {old && <span className={styles.old}>{old}</span>}
    </p>
  );
};
