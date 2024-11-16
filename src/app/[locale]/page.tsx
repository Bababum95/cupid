import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { Subscribe, Header, Footer, LangSwitcher } from "@/components";
import {
  Advantages,
  Comments,
  FAQ,
  Gallery,
  Ingredients,
  Recommendations,
  Slider,
  Video,
} from "@/components/home";
import { DEFAULLT_LOCALE } from "@/i18n/config";

import { VIDEOS } from "./config";
import styles from "./page.module.scss";

const BASE_URL = process.env.BASE_URL as string;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.main" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    applicationName: "Cupid",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "/",
      languages: { de: "/de" },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: "Cupid",
      images: {
        url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Cupid_cover_img.jpg",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
  const cookieStore = cookies();
  const t = useTranslations("HomePage");
  const metadata = useTranslations("Metadata.main");
  const commonMetadata = useTranslations("Metadata.common");

  return (
    <>
      {!cookieStore.has("LS") && locale === DEFAULLT_LOCALE && <LangSwitcher />}
      <Header />
      <main className={styles.page}>
        <Image
          src="/images/cupid-chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={1440}
          height={860}
          className={styles.image}
          priority
          quality={90}
        />
        <div className={styles.content}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.text}>
            {t.rich("description", { span: (chunks) => <span>{chunks}</span> })}
          </p>
          <Link href="/sex-chocolate" className={styles.button}>
            {t("by-now")}
          </Link>
        </div>
        <Advantages />
        <Recommendations />
        <Ingredients />
        <Slider title={t("what-our-customers-say")}>
          {VIDEOS.map((video, i) => (
            <Video
              description={video.description}
              key={i}
              poster={`/images/posters/${video.name}.png`}
            >
              {["webm", "mp4"].map((ext, i) => (
                <source
                  key={ext + i}
                  src={`/videos/${video.name}.${ext}`}
                  type={`video/${ext}`}
                />
              ))}
            </Video>
          ))}
        </Slider>
        <Gallery />
        <Comments />
        <FAQ />
        <Subscribe />
      </main>
      <Footer />
      {/* JSON-LD Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://cupidchoco.com/#organization",
                name: "Cupid",
                legalName: "SM MIR GmbH",
                url: "https://cupidchoco.com/",
                logo: {
                  "@type": "ImageObject",
                  url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/cupid_logo_1032px.png",
                  width: 1032,
                  height: 1032,
                },
                sameAs: [
                  "https://x.com/cupid_choco",
                  "https://www.instagram.com/cupid.choco.de",
                  "https://youtube.com/@cupid.choco_de",
                  "https://www.pinterest.com/cupidchoco/",
                  "https://www.tiktok.com/@cupid.choco",
                ],
                foundingDate: "2024-11-01",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Mühlenstr. 8a",
                  addressLocality: "Berlin",
                  postalCode: "14167",
                  addressCountry: "DE",
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+49 1522 674 04 25",
                    email: "info@cupidchoco.com",
                    contactType: "Customer Service",
                    availableLanguage: ["English", "German"],
                  },
                ],
                description: metadata("description-graph"),
              },
              {
                "@type": "WebSite",
                "@id": "https://cupidchoco.com/#website",
                url: "https://cupidchoco.com/",
                name: "Cupid Choco",
                publisher: {
                  "@id": "https://cupidchoco.com/#organization",
                },
                inLanguage: locale,
              },
              {
                "@type": "WebPage",
                "@id": "https://cupidchoco.com/#webpage",
                url: commonMetadata("home.url"),
                name: metadata("name"),
                isPartOf: {
                  "@id": "https://cupidchoco.com/#website",
                },
                about: {
                  "@id": "https://cupidchoco.com/#organization",
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  "@id": "https://cupidchoco.com/#primaryimage",
                  url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes1.jpg?v=1730905217",
                  width: 1032,
                  height: 1032,
                },
                description: metadata("description-wp"),
                inLanguage: locale,
                datePublished: "2024-11-01",
                dateModified: "2024-11-15",
                breadcrumb: {
                  "@id": "https://cupidchoco.com/#breadcrumb",
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://cupidchoco.com/#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@id": commonMetadata("home.url"),
                      name: commonMetadata("home.name"),
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
