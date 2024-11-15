import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.cart" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
    },
    applicationName: "Cupid",
    alternates: {
      canonical: "https://cupidchoco.com/cart",
      languages: { de: "https://cupidchoco.com/de/cart" },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description-og"),
      siteName: "Cupid",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Cupid_cover_img.jpg",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description-og"),
      site: "@cupid_choco",
      creator: "@cupid_choco_de",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Cupid_cover_img.jpg",
      },
    },
  };
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
