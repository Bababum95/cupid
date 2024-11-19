import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/routing";

import { SECTIONS } from "./config";
import styles from "./page.module.scss";

const BASE_URL = process.env.BASE_URL as string;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace:
      "Metadata.Blog.TheScienceBehindAphrodisiacChocolateMythOrReality",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "/the-science-behind-aphrodisiac-chocolate",
      languages: { de: "/de/the-science-behind-aphrodisiac-chocolate" },
    },
    openGraph: {
      type: "website",
      title: t("title-og"),
      description: t("description-og"),
      siteName: "Cupid",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Aphrodisiac_Chocolate.jpg",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title-og"),
      description: t("description-og"),
      site: "@cupid_choco",
      creator: "@cupid_choco_de",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Aphrodisiac_Chocolate.jpg",
      },
    },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations(
    "Blog.TheScienceBehindAphrodisiacChocolateMythOrReality"
  );
  const metadata = useTranslations(
    "Metadata.Blog.TheScienceBehindAphrodisiacChocolateMythOrReality"
  );
  // const commonMetadata = useTranslations("Metadata.common");
  // const homePage = commonMetadata("home.url");
  // const currentUrl = homePage + "faq";

  return (
    <>
      <div className={styles.hero}>
        <Image
          src="/images/chocolate.jpg"
          alt="Romantic Couple Sharing Chocolate"
          width={1440}
          height={440}
          priority
          className={styles.image}
          quality={90}
        />
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("title")}</h1>
        </div>
      </div>
      <div className={styles.container}>
        <aside className={styles.navbar}>
          <nav>
            <ul>
              {SECTIONS.map(({ key }) => (
                <li key={key}>
                  <Link href={`#${key}`}>{t(`${key}.title`)}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className={styles.content}>
          {SECTIONS.map(({ key, image }) => (
            <section key={key} id={key}>
              <h2>{t(`${key}.title`)}</h2>
              {image && (
                <Image
                  src={`/images/${image.src}`}
                  alt={image.alt}
                  width={547}
                  height={200}
                />
              )}
              <div>
                {t.rich(`${key}.content`, {
                  p: (chunks) => <p>{chunks}</p>,
                  h3: (chunks) => <h3>{chunks}</h3>,
                  h4: (chunks) => <h4>{chunks}</h4>,
                  h5: (chunks) => <h5>{chunks}</h5>,
                  ul: (chunks) => <ul>{chunks}</ul>,
                  li: (chunks) => <li>{chunks}</li>,
                  strong: (chunks) => <strong>{chunks}</strong>,
                  span: (chunks) => <span>{chunks}</span>,
                })}
              </div>
            </section>
          ))}
        </div>
        <aside className={styles.sidebar} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id":
                "https://cupidchoco.com/blog/the-science-behind-aphrodisiac-chocolate",
            },
            headline: metadata("title-og"),
            description: metadata("description"),
            image: [
              "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Aphrodisiac_Chocolate.jpg",
            ],
            author: {
              "@type": "Organization",
              name: "Cupid",
              url: "https://cupidchoco.com/",
              logo: {
                "@type": "ImageObject",
                url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/cupid_logo_1032px.png",
              },
            },
            publisher: {
              "@type": "Organization",
              name: "Cupid",
              logo: {
                "@type": "ImageObject",
                url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/cupid_logo_1032px.png",
              },
            },
            datePublished: "2024-11-15",
            dateModified: "2024-11-15",
            inLanguage: locale,
            keywords: metadata("keywords"),
            articleSection: "Aphrodisiac Chocolate",
            wordCount: "2696",
            about: [
              {
                "@type": "Thing",
                name: "Aphrodisiac",
              },
              {
                "@type": "Thing",
                name: "Chocolate",
              },
              {
                "@type": "Thing",
                name: "Intimacy",
              },
            ],
            isPartOf: {
              "@type": "Blog",
              "@id": "https://cupidchoco.com/",
              name: "Cupid Blog",
              publisher: {
                "@type": "Organization",
                name: "Cupid",
              },
            },
          }),
        }}
      />
    </>
  );
}
