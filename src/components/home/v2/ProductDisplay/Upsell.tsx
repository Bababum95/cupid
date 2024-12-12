import { FC, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import type { ProductType } from "@/types";
import { Price, ProductPopup } from "@/components";
import { dataUtils } from "@/utils";

import styles from "./Upsell.module.scss";

type Props = {
  product: ProductType;
  addToCart: (id: string, price: number) => void;
};

export const Upsell: FC<Props> = ({ product, addToCart }) => {
  const [popupProduct, setPopupProduct] = useState<ProductType | null>(null);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Complete Your Experience</p>
      <motion.div
        className={styles.product}
        onClick={() => setPopupProduct(product)}
        layoutId={product.variants[0].id}
      >
        <Image
          className={styles.image}
          src={product.featuredImage?.url || "/favicon.ico"}
          alt={product.title}
          width={76}
          height={76}
        />
        <div className={styles.info}>
          <p className={styles.name}>{product.title}</p>
          <Price
            price={dataUtils.formatPrice(product.variants[0].price)}
            old={dataUtils.formatPrice(product.variants[0].compareAtPrice)}
            left
          />
        </div>
        <button className={styles.button} type="button">
          + Add
        </button>
      </motion.div>
      <ProductPopup
        product={popupProduct}
        handleClose={() => setPopupProduct(null)}
        handleAddToCart={(id) =>
          addToCart(id, product.variants[0].price.amount)
        }
      />
    </div>
  );
};
