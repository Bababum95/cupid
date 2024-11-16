import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.faq" });

  return {
    title: t("title"),
    description: t("description"),
    applicationName: "Cupid",
    alternates: {
      canonical: "https://cupidchoco.com/faq",
      languages: { de: "https://cupidchoco.com/de/faq" },
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
  const t = useTranslations("Metadata.imprint");
  const commonMetadata = useTranslations("Metadata.faq");
  const homePage = commonMetadata("home.url");
  const currentUrl = homePage + "imprint";

  return (
    <>
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
