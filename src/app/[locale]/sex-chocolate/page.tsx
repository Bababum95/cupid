import { getTranslations } from "next-intl/server";

import { fetchShopify } from "@/lib/shopify";
import { logger } from "@/lib/logger";
import { CollectionQuery } from "@/graphql";
import { SelectProduct } from "@/components";
import { normalizeProductData } from "@/utils";
import type { ProductNode } from "@/types";

import styles from "./page.module.scss";

type Props = {
  params: { locale: string };
};

export const dynamic = "force-dynamic";

const getProducts = async () => {
  logger.debug("start fetching products");
  const startTimestamp = Date.now();

  try {
    const { collection } = await fetchShopify({
      query: CollectionQuery,
      variables: {
        handle: "sex-chocolate",
      },
    });

    const duration = Date.now() - startTimestamp;
    if (duration > 1500) {
      logger.warn("slow fetching products", { duration });
    } else {
      logger.debug("end fetching products", { duration });
    }
    return collection.products.edges.map(({ node }: { node: ProductNode }) =>
      normalizeProductData(node)
    );
  } catch (error) {
    logger.error("error fetching products", {
      error,
      duration: Date.now() - startTimestamp,
    });
  }
};

export default async function Page({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "SexChocolate",
  });

  if (!t) {}

  const products = await getProducts();

  return (
    <div className={styles.page}>
      <SelectProduct products={products} />
    </div>
  );
}
