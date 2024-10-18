import { fetchShopify } from "@/lib/shopify";
import { logger } from "@/lib/logger";
import { CollectionQuery } from "@/graphql";
import { SelectProduct } from "@/components";
import { normalizeProductData } from "@/utils";
import type { ProductNode } from "@/types";

import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

const getCollection = async () => {
  logger.debug("start fetching products");
  const startTimestamp = Date.now();

  try {
    const { collection } = await fetchShopify({
      query: CollectionQuery,
      variables: { handle: "sex-chocolate" },
    });

    const duration = Date.now() - startTimestamp;
    if (duration > 1500) {
      logger.warn("slow fetching products", { duration });
    } else {
      logger.debug("end fetching products", { duration });
    }

    const products = collection.products.edges.map(
      ({ node }: { node: ProductNode }) => normalizeProductData(node)
    );

    return {
      products,
      gifts: JSON.parse(collection.metafield.value),
    };
  } catch (error) {
    logger.error("error fetching products", {
      error,
      duration: Date.now() - startTimestamp,
    });

    throw new Error("Failed to fetch products");
  }
};

export default async function Page() {
  const { products, gifts } = await getCollection();

  return (
    <main className={styles.page}>
      <SelectProduct products={products} gifts={gifts} />
    </main>
  );
}
