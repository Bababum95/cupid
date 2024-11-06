import { SelectProduct } from "@/components/sex-chocolate";

import { getCollection } from "./getCollection";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { products, gifts } = await getCollection();
  
  return (
    <main className={styles.page}>
      <SelectProduct products={products} gifts={gifts} />
    </main>
  );
}
