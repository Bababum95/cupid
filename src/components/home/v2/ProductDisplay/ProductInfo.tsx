"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { NutritionalDrawerContent } from "@/components";
import PlusIcon from "@/icons/plus.svg";

import styles from "./ProductInfo.module.scss";

const SideDrawer = dynamic(() => import("@/components/dynamic/SideDrawer"), {
  ssr: false,
});

type DrawerContentProps = {
  name: string;
};

const DrawerContent: FC<DrawerContentProps> = ({ name }) => {
  const t = useTranslations("HomePage.V2.DrawerContents");

  return (
    <div className={styles.content}>
      {t.rich(name, {
        p: (chunks) => <p>{chunks}</p>,
        ul: (chunks) => <ul>{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        span: (chunks) => <span>{chunks}</span>,
        strong: (chunks) => <strong>{chunks}</strong>,
        br: () => <br />,
      })}
    </div>
  );
};

const PRODUCT_INFO_ITEMS = {
  "how-it-works": <DrawerContent name="how-it-works" />,
  "nutritional-information": <NutritionalDrawerContent />,
  "how-to-use": <DrawerContent name="how-to-use" />,
  "shiping-returns": <DrawerContent name="shiping-returns" />,
} as const;

export const ProductInfo = () => {
  const t = useTranslations("HomePage.V2");
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
