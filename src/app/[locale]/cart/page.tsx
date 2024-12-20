"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { BackButton, Disclaimer, SubmitButton } from "@/components";
import { dataUtils } from "@/utils";
import { relatedProductsQuery, giftFragment } from "@/graphql";
import { GiftType, ProductNode, ProductType } from "@/types";
import {
  Catalog,
  CartLine,
  ProgressBar,
  // DiscountCode,
} from "@/components/cart";
import { fetchShopify } from "@/lib/shopify";
import { get as getCart } from "@/lib/slices/cart";

import styles from "./page.module.scss";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [crossSells, setCrossSells] = useState<ProductType[]>([]);
  const [chocolate, setChocolate] = useState<ProductType | null>(null);
  const [gifts, setGifts] = useState<GiftType[]>([]);
  const [isLoading, setIsLoading] = useState({ crossSells: true });
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const t = useTranslations("Cart");

  const fetchCrossSells = async () => {
    let cupidChocolate: ProductType | null = null;

    const data = await fetchShopify({ query: relatedProductsQuery, locale });
    setIsLoading((prev) => ({ ...prev, crossSells: false }));

    if (data.chocolate) {
      cupidChocolate = dataUtils.normalizeProduct({
        ...data.chocolate,
        title: "Extra Cupid Box",
        description: "Double the pleasure at a limited-time offer! 33% OFF",
        bage: { value: "Hot Sale" },
        variants: {
          nodes: data.chocolate.variants.nodes.map(
            (variant: ProductNode["variants"]["nodes"][0]) => ({
              ...variant,
              compareAtPrice: variant.compareAtPrice || variant.price,
              price: {
                ...variant.price,
                amount: "19.99",
              },
            })
          ),
        },
      });

      setChocolate(cupidChocolate);
    }

    if (data.crossSells) {
      const products = data.crossSells.products.nodes.map((node: ProductNode) =>
        dataUtils.normalizeProduct(node)
      );

      if (cupidChocolate) products.unshift(cupidChocolate);

      setCrossSells(products);
    }

    if (data.gifts) {
      const parseGifts = JSON.parse(data.gifts.metafield.value) as string[];

      const giftsQuery = `
      query GiftsQuery {
        ${parseGifts
          .map((id, index) => {
            return `gift_${index}: product(id: "${id}") {
              ...GiftFragment
              description
              featuredImage {
                url
              }
            }`;
          })
          .join("\n")}
      }
      ${giftFragment}
      `;

      const giftsResponse = await fetchShopify({ query: giftsQuery });

      if (!giftsResponse) return;

      setGifts(dataUtils.formatGift(giftsResponse));
    }
  };

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cart.status === "idle" && cartId) {
      dispatch(getCart({ cartId, locale }));
    }

    fetchCrossSells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chocolate) return;

    if (cart.showExtraBox) {
      if (!crossSells.includes(chocolate)) {
        setCrossSells([chocolate, ...crossSells]);
      }
    } else {
      setCrossSells((prev) =>
        prev.filter(
          (product) => product.variants[0].id !== chocolate.variants[0].id
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.showExtraBox, chocolate]);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (cart.checkoutUrl) {
      // window.location.href = `${cart.checkoutUrl}&locale=${locale}`;

      const url = `${cart.checkoutUrl}&locale=${locale}`;
      window.open(url, "_self");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.cart}>
        <header className={styles.header}>
          <h1 className={styles.h2}>{t("your-cart")}</h1>
        </header>
        <ul className={styles.list}>
          {gifts[1]?.code && cart.lines[0]?.quantity === 1 && (
            <ProgressBar
              total={cart.total?.amount}
              chocolate={cart.lines[0].price.amount}
              complete={cart.discountCodes.includes(gifts[1].code)}
              gift={{ code: gifts[1].code, id: gifts[1].id }}
            />
          )}
          {cart.lines.map((line, index) => (
            <CartLine
              key={line.id}
              image={line.image}
              title={line.title}
              description={line.description}
              canRemove={index !== 0}
              id={line.id}
              removing={line.removing}
              price={dataUtils.formatPrice(line.price)}
              oldPrice={dataUtils.formatPrice(line.compareAtPrice)}
            />
          ))}
          {gifts[0]?.code &&
            cart.lines.every((line) => line.productId !== gifts[0].id) && (
              <CartLine
                image={gifts[0].image}
                title={gifts[0].title}
                description={gifts[0].description}
                id={gifts[0].id}
                price="0,00 €"
                oldPrice={gifts[0].price}
                gift={gifts[0].code}
              />
            )}

          {/* <DiscountCode gifts={gifts} /> */}
          <div className={styles.disclaimer}>
            <Disclaimer />
          </div>
        </ul>
        <form className={styles.footer} onSubmit={handleSubmit}>
          <SubmitButton
            label={t("checkout")}
            isActive
            total={dataUtils.formatPrice(cart.total)}
          />
        </form>
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.h2}>{t("complete-your-experience")}</h2>
          <BackButton />
        </header>
        <Catalog products={crossSells} isLoading={isLoading.crossSells} />
      </div>
    </main>
  );
}
