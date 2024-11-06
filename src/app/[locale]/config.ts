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
    performance: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      enabled: true,
      autoClear: {
        cookies: [
          {
            name: /^(_shopify_s|_shopify_y)/,
          },
        ],
      },
    },
  },

  language: {
    default: "en",
    autoDetect: "browser",

    translations: {
      en: "/cookie/en.json",
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
