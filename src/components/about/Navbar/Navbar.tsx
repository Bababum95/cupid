import { FC } from "react";
import { useTranslations } from "next-intl";

import styles from "./Navbar.module.scss";
import Link from "next/link";

type Props = {
  name: string;
  quontity: number;
};
export const Navbar: FC<Props> = ({ name, quontity }) => {
  const t = useTranslations(name);

  return (
    <aside className={styles.wrapper}>
      {Array.from({ length: quontity }).map((_, i) => (
        <Link key={i} href={`#${i + 1}`} className={styles.link}>
          {t(`${i + 1}`)}
        </Link>
      ))}
    </aside>
  );
};
