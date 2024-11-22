"use client";

import { FC, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

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
  const isDesktop = useMediaQuery({ query: "(min-width: 701px)" });

  const addToCart = async (id: string) => {
    await dispatch(addLine({ line: { merchandiseId: id, quantity: 1 } }));
  };

  useEffect(() => {
    if (!isDesktop) return;

    console.log(isDesktop);
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isDesktop]);

  const openPopup = (product: ProductType) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
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
