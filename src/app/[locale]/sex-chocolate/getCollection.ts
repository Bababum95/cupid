import { fetchShopify } from "@/lib/shopify";
import { logger } from "@/lib/logger";
import { productFragment } from "@/graphql";
import { dataUtils } from "@/utils";
import type { ProductNode } from "@/types";

export const query = `
query CollectionQuery($withMetafields: Boolean = false) {
  collection(handle: "sex-chocolate") {
    products(first: 3) {
      nodes {
        ...ProductFragment
      }
    }
    metafield(key: "gifts", namespace: "collection") {
      value
    }
  }
}
${productFragment}`;

export const getCollection = async () => {
  logger.debug("start fetching products");
  const startTimestamp = Date.now();

  try {
    const { collection } = await fetchShopify({ query });

    const duration = Date.now() - startTimestamp;
    if (duration > 1500) {
      logger.warn("slow fetching products", { duration });
    } else {
      logger.debug("end fetching products", { duration });
    }

    const products = collection.products.nodes.map((node: ProductNode) =>
      dataUtils.normalizeProduct(node)
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

    throw new Error("fetching products: " + JSON.stringify(error));
  }
};
