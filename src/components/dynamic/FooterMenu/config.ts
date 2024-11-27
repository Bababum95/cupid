const WHATSAPP_URI = process.env.WHATSAPP_URI as string;

export const LINKS = [
  {
    name: "info",
    list: [
      { label: "about", href: "#" },
      { label: "contact-us", href: WHATSAPP_URI },
      { label: "faq", href: "/faq" },
      { label: "shiping", href: "/refund-policy" },
      { label: "order", href: "https://my.cupidchoco.com/" },
    ],
  },
  {
    name: "legal",
    cookies: true,
    list: [
      { label: "refund-policy", href: "/refund-policy" },
      { label: "privacy", href: "/privacy-policy" },
      { label: "terms", href: "/terms-of-service" },
      { label: "imprint", href: "/imprint" },
      // { label: "cookies", href: "/privacy-policy#6" },
    ],
  },
];
