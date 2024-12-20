import LogoIcon from "@/icons/logotype.svg";
import { Link } from "@/i18n/routing";

import { PrefetchHomePage } from "@/components/marketing";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <LogoIcon width={74} height={32} viewBox="0 0 60 26" />
      </div>
      <h1 className={styles.title}>
        Bist Du bereit die einzigartige Cupid Schokolade zu entdecken?
      </h1>
      <p className={styles.text}>
        Durch die Bestätigung gelangst Du zum Cupid Onlineshop.
      </p>
      <Link href="/" className={styles.button}>
        Zum Cupid Onlineshop
      </Link>
      <PrefetchHomePage />
    </main>
  );
}
