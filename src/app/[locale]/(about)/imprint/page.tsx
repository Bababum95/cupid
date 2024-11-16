import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import { Navbar, Content } from "@/components/about";

const BASE_URL = process.env.BASE_URL as string;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.imprint" });

  return {
    title: t("title"),
    description: t("description"),
    applicationName: "Cupid",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "/imprint",
      languages: { de: "/de/imprint" },
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

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("Metadata.imprint");
  const commonMetadata = useTranslations("Metadata.common");
  const homePage = commonMetadata("home.url");
  const currentUrl = homePage + "imprint";

  return (
    <>
      <Navbar name="Imprint" quontity={4} />
      <Content name="Imprint" quontity={4} />
      {/* JSON-LD Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: currentUrl,
            name: t("name"),
            description: t("description"),
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
                  name: t("name"),
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
