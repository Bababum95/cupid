import { useTranslations } from "next-intl";

import { Footer, Header } from "@/components/sex-chocolate";

export default function SexChocolateLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const metadata = useTranslations("Metadata.chocolate");
  const commonMetadata = useTranslations("Metadata.common");
  const homePage = commonMetadata("home.url");
  const currentUrl = homePage + "sex-chocolate";

  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* JSON-LD Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": "https://cupidchoco.com/sex-chocolate#product",
                name: metadata("name"),
                description: metadata("description-graph"),
                sku: "CPD01",
                mpn: "CPD01",
                gtin13: "0721688150398",
                brand: {
                  "@type": "Brand",
                  name: "Cupid",
                },
                image: [
                  "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/cupid-choco2.jpg?v=1730910763",
                  "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes1_ca652e9a-aba4-4e24-8599-a9020f30ff3e.jpg?v=173097889",
                  "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes2.jpg?v=1730905243",
                  "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes3.jpg?v=1730905260",
                ],
                url: currentUrl,
                category: metadata("category"),
                color: metadata("color"),
                material: metadata("material"),
                weight: "87g",
                size: "87g bar",
                countryOfOrigin: "DE",
                manufacturer: {
                  "@type": "Organization",
                  name: "SM MIR GmbH",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Mühlenstr. 8a",
                    addressLocality: "Berlin",
                    postalCode: "14167",
                    addressCountry: "DE",
                  },
                },
                additionalProperty: Array.from({ length: 6 }, (_, i) => {
                  return {
                    "@type": "PropertyValue",
                    name: metadata(`additional.${i}.name`),
                    value: metadata(`additional.${i}.value`),
                  };
                }),
                nutrition: {
                  "@type": "NutritionInformation",
                  servingSize: "14.5 grams",
                  calories: "85 kcal",
                  fatContent: "6 g",
                  saturatedFatContent: "3.5 g",
                  carbohydrateContent: "8 g",
                  sugarContent: "5 g",
                  proteinContent: "1.2 g",
                  fiberContent: "2 g",
                  sodiumContent: "0 mg",
                },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "EUR",
                  price: "29.99",
                  priceValidUntil: "2025-12-31",
                  itemCondition: "https://schema.org/NewCondition",
                  availability: "https://schema.org/InStock",
                  url: currentUrl,
                  seller: {
                    "@type": "Organization",
                    name: "Cupid",
                  },
                  shippingDetails: [
                    {
                      "@type": "OfferShippingDetails",
                      shippingRate: {
                        "@type": "MonetaryAmount",
                        value: "0.00",
                        currency: "EUR",
                      },
                      shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "DE",
                      },
                      deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        handlingTime: {
                          "@type": "QuantitativeValue",
                          minValue: 1,
                          maxValue: 2,
                          unitCode: "DAY",
                        },
                        transitTime: {
                          "@type": "QuantitativeValue",
                          minValue: 1,
                          maxValue: 2,
                          unitCode: "DAY",
                        },
                      },
                    },
                    {
                      "@type": "OfferShippingDetails",
                      shippingRate: {
                        "@type": "MonetaryAmount",
                        value: "3.95",
                        currency: "EUR",
                      },
                      shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: ["AT", "CH", "IT", "NL"],
                      },
                      deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        handlingTime: {
                          "@type": "QuantitativeValue",
                          minValue: 1,
                          maxValue: 2,
                          unitCode: "DAY",
                        },
                        transitTime: {
                          "@type": "QuantitativeValue",
                          minValue: 3,
                          maxValue: 5,
                          unitCode: "DAY",
                        },
                      },
                    },
                  ],
                },
                returnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  name: "Return Policy",
                  url: "https://cupidchoco.com/return-policy",
                  merchantReturnDays: 14,
                  returnFees: "https://schema.org/RestockingFees",
                  returnPolicyCategory:
                    "https://schema.org/ReturnableWithRestockingFee",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  reviewCount: "153",
                },
                review: [
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Lisa M.",
                    },
                    datePublished: "2024-11-02",
                    reviewBody:
                      "Absolut begeistert! Die Verpackung ist wunderschön und die Schokolade schmeckt fantastisch. Werde definitiv wieder bestellen!",
                    name: "Absolut begeistert!",
                    reviewRating: {
                      "@type": "Rating",
                      bestRating: "5",
                      ratingValue: "5",
                      worstRating: "1",
                    },
                  },
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Daniel W.",
                    },
                    datePublished: "2024-11-01",
                    reviewBody:
                      "War zuerst skeptisch, aber es hat wirklich etwas Besonderes zu unserem Abend beigetragen. Sehr empfehlenswert!",
                    name: "Sehr empfehlenswert",
                    reviewRating: {
                      "@type": "Rating",
                      bestRating: "5",
                      ratingValue: "5",
                      worstRating: "1",
                    },
                  },
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Sophie K.",
                    },
                    datePublished: "2024-10-31",
                    reviewBody:
                      "Das perfekte Geschenk für meinen Partner. Wir haben es beide sehr genossen. Werde auf jeden Fall wieder kaufen!",
                    name: "Perfektes Geschenk",
                    reviewRating: {
                      "@type": "Rating",
                      bestRating: "5",
                      ratingValue: "5",
                      worstRating: "1",
                    },
                  },
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Alex H.",
                    },
                    datePublished: "2024-10-30",
                    reviewBody:
                      "Toller Geschmack und spürbare Wirkung. Kam schnell und diskret an. Danke!",
                    name: "Toller Geschmack",
                    reviewRating: {
                      "@type": "Rating",
                      bestRating: "5",
                      ratingValue: "5",
                      worstRating: "1",
                    },
                  },
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Emma S.",
                    },
                    datePublished: "2024-10-29",
                    reviewBody:
                      "Wunderschöne Verpackung und köstliche Schokolade. Hat unseren Date-Abend besonders gemacht.",
                    name: "Wunderschöne Verpackung",
                    reviewRating: {
                      "@type": "Rating",
                      bestRating: "5",
                      ratingValue: "5",
                      worstRating: "1",
                    },
                  },
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Tom R.",
                    },
                    datePublished: "2024-10-28",
                    reviewBody:
                      "Habe keinen großen Unterschied bemerkt, aber die Schokolade war lecker. Werde es vielleicht nochmal versuchen.",
                    name: "Leckere Schokolade",
                    reviewRating: {
                      "@type": "Rating",
                      bestRating: "5",
                      ratingValue: "5",
                      worstRating: "1",
                    },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${currentUrl}#breadcrumb`,
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
                    name: metadata("name-crumb"),
                    item: currentUrl,
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://cupidchoco.com/sex-chocolate#webpage",
                url: "https://cupidchoco.com/sex-chocolate",
                name: "Cupid Sex Chocolate | Natural Aphrodisiac for Couples",
                description:
                  "Discover Cupid's Sex Chocolate, a natural aphrodisiac chocolate designed to enhance intimacy and ignite passion among couples.",
                inLanguage: locale,
                isPartOf: {
                  "@id": "https://cupidchoco.com/#website",
                },
                breadcrumb: {
                  "@id": "https://cupidchoco.com/sex-chocolate#breadcrumb",
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes1_ca652e9a-aba4-4e24-8599-a9020f30ff3e.jpg?v=1730978890",
                },
              },
              {
                "@type": "WebSite",
                "@id": "https://cupidchoco.com/#website",
                url: "https://cupidchoco.com/",
                name: "Cupid Choco",
                inLanguage: locale,
                publisher: {
                  "@id": "https://cupidchoco.com/#organization",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://cupidchoco.com/#organization",
                name: "Cupid",
                url: "https://cupidchoco.com/",
                logo: {
                  "@type": "ImageObject",
                  url: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/cupid_logo_1032px.png",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+49 1522 674 04 25",
                  email: "info@cupidchoco.com",
                  contactType: "Customer Service",
                  availableLanguage: ["English", "German"],
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Mühlenstr. 8a",
                  addressLocality: "Berlin",
                  postalCode: "14167",
                  addressCountry: "DE",
                },
                sameAs: [
                  "https://x.com/cupid_choco",
                  "https://www.instagram.com/cupid.choco.de",
                  "https://youtube.com/@cupid.choco_de",
                  "https://www.pinterest.com/cupidchoco/",
                  "https://www.tiktok.com/@cupid.choco",
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
