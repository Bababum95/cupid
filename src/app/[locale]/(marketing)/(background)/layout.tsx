import { cookies } from "next/headers";
import classNames from "classnames";

import { PrefetchHomePage } from "@/components/marketing";

import styles from "./layout.module.scss";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const version = cookieStore.get("variant")?.value === "2" ? "v2" : "v1";

  return (
    <main className={classNames(styles.page, styles[version])}>
      {children}
      <PrefetchHomePage />
    </main>
  );
}
