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
    src: "/videos/video.mov",
    description: "Cupid Chocolate",
  },
  {
    src: "/videos/video.mov",
    description: "Cupid Chocolate 2",
  },
  {
    src: "/videos/video.mov",
    description: "Cupid Chocolate 3",
  },
  {
    src: "/videos/video.mov",
    description: "Cupid Chocolate 4",
  },
  {
    src: "/videos/video.mov",
    description: "Cupid Chocolate",
  },
  {
    src: "/videos/video.mov",
    description: "Cupid Chocolate 2",
  },
  {
    src: "/videos/video.mov",
    description: "Cupid Chocolate 3",
  },
  {
    src: "/videos/video.mov",
    description: "Cupid Chocolate 4",
  },
];
