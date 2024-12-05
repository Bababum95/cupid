"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { BenefitsDrawerContent, NutritionalDrawerContent } from "@/components";
import PlusIcon from "@/icons/plus.svg";

import styles from "./ProductInfo.module.scss";

const SideDrawer = dynamic(() => import("@/components/dynamic/SideDrawer"), {
  ssr: false,
});

export const ProductInfo = () => {
  const t = useTranslations("HomePage.V2");

  const PRODUCT_INFO_ITEMS = {
      "how-it-works": <div>How it works</div>,
      "nutritional-information": <NutritionalDrawerContent />,
      "how-to-use": <div>How to use</div>,
      "product-benefits": <BenefitsDrawerContent />,
  } as const;

  const [drawer, setDrawer] = useState<keyof typeof PRODUCT_INFO_ITEMS | null>(
    null
  );

  const openDrawer = (name: keyof typeof PRODUCT_INFO_ITEMS) => {
    document.body.classList.add("no-scroll");
    setDrawer(name);
  };

  const closeDrawer = () => {
    document.body.classList.remove("no-scroll");
    setDrawer(null);
  };

  return (
    <>
      <ul>
        {Object.keys(PRODUCT_INFO_ITEMS).map((item) => (
          <li
            key={item}
            className={styles.item}
            onClick={() => openDrawer(item as keyof typeof PRODUCT_INFO_ITEMS)}
          >
            {t(item)}
            <PlusIcon />
          </li>
        ))}
      </ul>
      <SideDrawer
        isOpen={!!drawer}
        onClose={closeDrawer}
        title={drawer ? t(drawer) : ""}
      >
        {drawer && PRODUCT_INFO_ITEMS[drawer]}
      </SideDrawer>
    </>
  );
};
