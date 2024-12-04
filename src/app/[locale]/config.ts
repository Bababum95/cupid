import type { CookieConsentConfig, CookieValue } from "vanilla-cookieconsent";

const saveCookie = (cookie: CookieValue) => {
  fetch("/api/cookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cookie),
  });
};

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

  onFirstConsent: function ({ cookie }) {
    saveCookie(cookie);
  },

  onChange: function ({ cookie }) {
    saveCookie(cookie);
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

export const HIDE_INTERCOM_PATHS = [
  "/sex-chocolate",
  "/de/sex-chocolate",
  "/cart",
  "/de/cart",
];
