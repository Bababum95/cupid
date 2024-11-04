"use client";

import { FC, useState } from "react";

import type { ProductType } from "@/types";
import { useAppDispatch } from "@/hooks";
import { addLine } from "@/lib/slices/cart";

import { ProductPopup } from "./ProductPopup";
import { Product } from "./Product";
import { ProductLoader } from "./ProductLoader";
import styles from "./Catalog.module.scss";

type Props = {
  products: ProductType[];
  isLoading?: boolean;
};

export const Catalog: FC<Props> = ({ products, isLoading }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const dispatch = useAppDispatch();

  const addToCart = async (id: string) => {
    await dispatch(addLine({ merchandiseId: id, quantity: 1 }));
  };

  const openPopup = (product: ProductType) => {
    document.body.style.overflow = "hidden";
    setSelectedProduct(product);
  };

  const closePopup = () => {
    document.body.style.overflow = "auto";
    setSelectedProduct(null);
  };

  return (
    <>
      <ul className={styles.list}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ProductLoader key={i} />)
          : products.map((product, index) => (
              <Product
                key={index}
                product={product}
                openPopup={openPopup}
                handleAddToCart={addToCart}
              />
            ))}
      </ul>
      <ProductPopup
        product={selectedProduct}
        handleClose={closePopup}
        handleAddToCart={addToCart}
      />
    </>
  );
};
