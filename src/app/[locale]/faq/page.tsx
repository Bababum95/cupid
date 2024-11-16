import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import { Content } from "@/components/faq";

const BASE_URL = process.env.BASE_URL as string;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.faq" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "/faq",
      languages: { de: "/de/faq" },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: "Cupid",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Cupid_Cover.jpg",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      site: "@cupid_choco",
      creator: "@cupid_choco_de",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Cupid_Cover.jpg",
      },
    },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const metadata = useTranslations("Metadata.faq");
  const commonMetadata = useTranslations("Metadata.common");
  const homePage = commonMetadata("home.url");
  const currentUrl = homePage + "faq";

  return (
    <>
      <Content />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: currentUrl,
            name: "FAQ",
            description: metadata("description"),
            inLanguage: locale,
            isPartOf: {
              "@type": "WebSite",
              url: "https://cupidchoco.com/",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: commonMetadata("home.name"),
                  item: homePage,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "FAQ",
                  item: currentUrl,
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
