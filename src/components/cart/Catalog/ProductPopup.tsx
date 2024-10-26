import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import classNames from "classnames";

import type { ProductType } from "@/types";
import { dataUtils } from "@/utils";
import { Price } from "@/components";
import { default as CloseIcon } from "@/icons/close.svg";

import styles from "./ProductPopup.module.scss";

const tabs = ["ingredients", "how-to-use", "product-details"] as const;

type Props = {
  product: ProductType | null;
  handleClose: () => void;
  handleAddToCart: (id: string) => void;
};

export const ProductPopup: FC<Props> = ({
  handleClose,
  product,
  handleAddToCart,
}) => {
  return (
    <AnimatePresence>
      {product && (
        <motion.div className={styles.popup} onClick={handleClose}>
          <Product
            product={product}
            handleClose={handleClose}
            handleAddToCart={handleAddToCart}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type ProductProps = {
  product: ProductType;
  handleClose: () => void;
  handleAddToCart: (id: string) => void;
};

const Product: FC<ProductProps> = ({
  product,
  handleClose,
  handleAddToCart,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [variantIndex, setVariantIndex] = useState<number | null>(
    product.variants.length === 1 ? 0 : null
  );
  const [tab, setTab] = useState<
    "ingredients" | "product-details" | "how-to-use" | null
  >(null);
  const t = useTranslations("Common");
  const variant = product.variants[variantIndex || 0];

  const addTocart = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (variantIndex === null) return;

    setIsLoading(true);
    await handleAddToCart(product.variants[variantIndex].id);
    setIsLoading(false);
    handleClose();
  };

  return (
    <motion.div
      layoutId={product.variants[0].id}
      className={styles.container}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.preview}>
        <Image
          src={
            variantIndex === null
              ? product.featuredImage.url
              : variant.image.url
          }
          alt={product.title}
          width={350}
          height={520}
          className={styles.image}
        />
        <AnimatePresence initial={false}>
          {tab !== null && product[tab] && (
            <motion.div
              className={styles["tab-content"]}
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto", marginTop: 12 },
                collapsed: { opacity: 0, height: 0, marginTop: 0 },
              }}
            >
              <h3 className={styles["tab-title"]}>{t(tab)}</h3>
              <AnimatePresence initial={false}>
                {product[tab].children.map((node, index) =>
                  node.type === "list" ? (
                    <motion.ul key={index} className={styles["tab-list"]}>
                      <AnimatePresence>
                        {node.children.map((node, index) => (
                          <motion.li key={index} className={styles["tab-item"]}>
                            {node.children.map((node, index) => (
                              <span key={index}>{node.value}</span>
                            ))}
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </motion.ul>
                  ) : (
                    <motion.p key={index} className={styles["tab-text"]}>
                      {node.children.map((node, index) => (
                        <span key={index}>{node.value}</span>
                      ))}
                    </motion.p>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <button className={styles.close} onClick={handleClose}>
          <CloseIcon />
        </button>
        {variantIndex !== null && product.variants.length > 1
          ? variant.description && (
              <p className={styles.description}>
                <span>{variant.title}</span> - {variant.description}
              </p>
            )
          : product.description && (
              <p className={styles.description}>{product.description}</p>
            )}
        {variant.unitPriceMeasurement && (
          <ul className={styles["info-list"]}>
            <li className={styles["info-item"]}>
              <span>{t("weight-of-product")}</span>
              <span className={styles.dots} />
              <span>
                {variant.unitPriceMeasurement.quantityValue}
                {variant.unitPriceMeasurement.quantityUnit?.toLowerCase()}
              </span>
            </li>
            <li className={styles["info-item"]}>
              <span>
                {t("price-per")}{" "}
                {variant.unitPriceMeasurement.referenceValue !== 1 &&
                  variant.unitPriceMeasurement.referenceValue}
                {variant.unitPriceMeasurement.referenceUnit?.toLowerCase()}
              </span>
              <span className={styles.dots} />
              <span>
                {dataUtils.calculateUnitPrice({
                  unitPriceMeasurement: variant.unitPriceMeasurement,
                  price: variant.price,
                })}
              </span>
            </li>
          </ul>
        )}
        {product.variants.length > 1 && (
          <ul className={styles["variant-list"]}>
            {product.variants.map((variant, index) => (
              <li
                key={variant.id}
                className={classNames(styles["variant-item"], {
                  [styles.active]: variantIndex === index,
                })}
                onClick={() => setVariantIndex(index)}
              >
                {variant.title}
              </li>
            ))}
          </ul>
        )}
        <footer className={styles.footer}>
          <div className={styles.row}>
            {variantIndex !== null && (
              <Price
                price={dataUtils.formatPrice(variant.price)}
                old={dataUtils.formatPrice(variant.compareAtPrice)}
                left
              />
            )}
            <button
              className={classNames(styles.button, {
                [styles.loading]: isLoading,
              })}
              disabled={variantIndex === null}
              onClick={addTocart}
            >
              {t("add-to-cart")}
            </button>
          </div>
          <div className={styles.row}>
            <ul className={styles.tabs}>
              {tabs.map(
                (value) =>
                  product[value] && (
                    <li
                      key={value}
                      onClick={() => setTab(value)}
                      className={classNames(styles.tab, {
                        [styles.active]: tab === value,
                      })}
                    >
                      {t(value)}
                    </li>
                  )
              )}
            </ul>
            <span className={styles.inkl}>* – {t("inkl")}</span>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};
