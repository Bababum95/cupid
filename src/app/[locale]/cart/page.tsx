"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { BackButton, Price, SubmitButton } from "@/components";
import { dataUtils } from "@/utils";
import { crossSellsQuery } from "@/graphql";
import { ProductNode, ProductType } from "@/types";
import { fetchShopify } from "@/lib/shopify";
import { Catalog } from "@/components/cart";
import { get as getCart } from "@/lib/slices/cart";

import styles from "./page.module.scss";

export default function Page() {
  const [crossSells, setCrossSells] = useState<ProductType[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const t = useTranslations("Cart");

  const fetchCrossSells = async () => {
    const { collection } = await fetchShopify({
      query: crossSellsQuery,
    });

    if (!collection) return;

    const products = collection.products.nodes.map((node: ProductNode) =>
      dataUtils.normalizeProduct(node)
    );

    setCrossSells(products);
  };

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cart.status === "idle" && cartId) {
      dispatch(getCart(cartId));
    }
    fetchCrossSells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (cart.checkoutUrl) window.location.href = cart.checkoutUrl;
  };

  return (
    <main className={styles.page}>
      <form className={styles.cart} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <h1 className={styles.h2}>{t("your-cart")}</h1>
        </header>
        <ul className={styles.list}>
          {cart.lines.map((line) => (
            <li key={line.id} className={styles.item}>
              <Image
                src={line.image.url}
                alt={line.title}
                width={123}
                height={123}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3 className={styles.title}>{line.title}</h3>
                <p className={styles.description}>{line.description}</p>
                <div className={styles.bottom}>
                  <Price
                    price={dataUtils.formatPrice(line.price)}
                    old={dataUtils.formatPrice(line.compareAtPrice)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <footer className={styles.footer}>
          <SubmitButton
            label={t("checkout")}
            isActive
            total={dataUtils.formatPrice(cart.total)}
          />
        </footer>
      </form>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.h2}>{t("complete-your-experience")}</h2>
          <BackButton />
        </header>
        <Catalog products={crossSells} />
      </div>
    </main>
  );
}
