"use client";

import { FC, useState } from "react";

import type { ProductType } from "@/types";
import { useAppDispatch } from "@/hooks";
import { addLine } from "@/lib/slices/cart";

import { ProductPopup } from "./ProductPopup";
import { Product } from "./Product";
import styles from "./Catalog.module.scss";

type Props = {
  products: ProductType[];
};

export const Catalog: FC<Props> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const dispatch = useAppDispatch();

  const addToCart = async (id: string) => {
    await dispatch(addLine({ merchandiseId: id, quantity: 1 }));
  };

  const openPopup = (product: ProductType) => {
    document.body.classList.add("no-scroll");
    setSelectedProduct(product);
  };

  const closePopup = () => {
    document.body.classList.remove("no-scroll");
    setSelectedProduct(null);
  };

  return (
    <>
      <ul className={styles.list}>
        {products.map((product, index) => (
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
