import LogoIcon from "@/icons/logotype.svg";
import CloseIcon from "@/icons/close.svg";
import { Link } from "@/i18n/routing";
import { ClipBoardButton } from "@/components/marketing";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <LogoIcon width={74} height={32} viewBox="0 0 60 26" />
        <Link href="/" className={styles.close}>
          <CloseIcon width={12} height={12} viewBox="0 0 12 12" />
        </Link>
      </div>
      <h1 className={styles.title}>10% Rabatt</h1>
      <p className={styles.text}>
        Der Rabatt gilt nur heute und ausschließlich für neue Nutzer.
      </p>
      <div className={styles.input}>
        <span>CUPIDNEW</span>
        <ClipBoardButton value="CUPIDNEW" />
      </div>
      <Link href="/" className={styles.button}>
        Zum Einkaufen
      </Link>
    </div>
  );
}
