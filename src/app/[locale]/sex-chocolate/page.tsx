import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SelectProduct } from "@/components/sex-chocolate";

import { getCollection } from "./getCollection";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.chocolate" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    applicationName: "Cupid",
    alternates: {
      canonical: "https://cupidchoco.com/sex-chocolate",
      languages: { de: "https://cupidchoco.com/de/sex-chocolate" },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description-og"),
      siteName: "Cupid",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes1_ca652e9a-aba4-4e24-8599-a9020f30ff3e.jpg?v=1730978890",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description-tw"),
      site: "@cupid_choco",
      creator: "@cupid_choco_de",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes1_ca652e9a-aba4-4e24-8599-a9020f30ff3e.jpg?v=1730978890",
      },
    },
  };
}

export default async function Page() {
  const { products, gifts } = await getCollection();

  return (
    <main className={styles.page}>
      <SelectProduct products={products} gifts={gifts} />
    </main>
  );
}
