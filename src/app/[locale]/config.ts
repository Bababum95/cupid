import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const COOKIE_CONSENT_CONFIG: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box wide",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "left",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  onFirstConsent: function () {
    console.log("onFirstAction fired");
  },

  onConsent: function ({ cookie }) {
    console.log("onConsent fired ...", cookie);
  },

  onChange: function ({ changedCategories, cookie }) {
    console.log("onChange fired ...", changedCategories, cookie);
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    performance: {
      enabled: true,
      autoClear: {
        cookies: [
          {
            name: /^(_shopify_s|_shopify_sa_p)/,
          },
        ],
      },
    },
    analytics: {
      enabled: true,
      autoClear: {
        cookies: [
          {
            name: /^(_shopify_y|_ga|_gid)/,
          },
        ],
      },
    },
    marketing: {
      enabled: true,
      autoClear: {
        cookies: [
          {
            name: /^(_fbp|_gcl_au)/,
          },
        ],
      },
    },
  },

  language: {
    default: "en",
    autoDetect: "document",

    translations: {
      en: "/cookie/en.json",
      de: "/cookie/de.json",
    },
  },
};

export const VIDEOS = [
  {
    name: "IMG_4435",
    description:
      "Bin jetzt schon begeistert, nur vom Aussehen der Box! Heute Abend wird spannend...",
  },
  {
    name: "IMG_4437",
    description:
      "Nach 5 Jahren Beziehung – endlich mal wieder guten Seggs gehabt. Ist schon unsere zweite Packung...",
  },
  {
    name: "IMG_4439",
    description:
      "Mit der Schoki und der Augenbinde wird das heute ein richtig krasser Abend. Danke Cupid für das Geschenk!",
  },
  {
    name: "IMG_4438",
    description:
      "Hab heute die Lieferung bekommen und jetzt geht’s direkt zum Date.. Übernachtung inklusive",
  },
];

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cupid",
  legalName: "SM MIR GmbH",
  url: "https://cupidchoco.com/",
  logo: "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/cupid_logo_1032px.png",
  sameAs: [
    "https://x.com/cupid_choco",
    "https://www.instagram.com/cupid.choco.de",
    "https://youtube.com/@cupid.choco_de",
    "https://www.pinterest.com/cupidchoco/",
    "https://www.tiktok.com/@cupid.choco",
  ],
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mühlenstr. 8a",
    addressLocality: "Berlin",
    postalCode: "14167",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+49 1522 674 04 25",
    email: "info@cupidchoco.com",
    contactType: "Customer Service",
    availableLanguage: ["English", "German"],
  },
  description:
    "Cupid offers aphrodisiac chocolate for couples, crafted with natural ingredients to naturally ignite passion and enhance intimacy.",
};

const PRODUCT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cupid Aphrodisiac Chocolate",
  description:
    "Aphrodisiac chocolate crafted with natural ingredients to enhance intimacy and passion for couples.",
  image:
    "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/Boxes1.jpg?v=1730905217",
  url: "https://cupidchoco.com/",
  sku: "CPD01",
  brand: {
    "@type": "Brand",
    name: "Cupid",
  },
  offers: {
    "@type": "Offer",
    url: "https://cupidchoco.com/",
    priceCurrency: "EUR",
    price: "29.99",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Cupid",
  image:
    "https://cdn.shopify.com/s/files/1/0871/6163/5140/files/cupid_logo_1032px.png",
  telephone: "+4915226740425",
  email: "info@cupidchoco.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mühlenstr. 8a",
    addressLocality: "Berlin",
    postalCode: "14167",
    addressCountry: "DE",
  },
  openingHours: "Mo-Sa 05:00-23:30",
  priceRange: "$",
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cupid",
  url: "https://cupidchoco.com/",
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://cupidchoco.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Shop",
      item: "https://cupidchoco.com/sex-chocolate",
    },
  ],
};

export const SCHEMA_MARKUP = [
  ORGANIZATION_JSON_LD,
  PRODUCT_JSON_LD,
  LOCAL_BUSINESS_JSON_LD,
  WEBSITE_JSON_LD,
  BREADCRUMB_JSON_LD,
];
