import { FC } from "react";

import styles from "./Wrapper.module.scss";

type Props = {
  children: React.ReactNode;
};

export const Wrapper: FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
