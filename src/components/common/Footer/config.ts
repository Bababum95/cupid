import YoutubeIcon from "@/icons/youtube.svg";
import PinterestIcon from "@/icons/pinterest.svg";
import TiktokIcon from "@/icons/tiktok.svg";
import InstagramIcon from "@/icons/instagram.svg";
import TwitterIcon from "@/icons/twitter.svg";

export const LINKS = [
  {
    name: "info",
    list: [
      { label: "about", href: "/about" },
      { label: "contact-us", href: "https://my.cupidchoco.com/" },
      { label: "faq", href: "/#faq" },
      { label: "shiping", href: "/refund-policy" },
      { label: "order", href: "https://my.cupidchoco.com/" },
    ],
  },
  {
    name: "legal",
    list: [
      { label: "refund-policy", href: "/refund-policy" },
      { label: "privacy", href: "/privacy-policy" },
      { label: "terms", href: "/terms-of-service" },
      { label: "imprint", href: "/imprint" },
      { label: "cookies", href: "/privacy-policy#6" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { Icon: YoutubeIcon, href: "#" },
  { Icon: PinterestIcon, href: "#" },
  { Icon: TiktokIcon, href: "#" },
  { Icon: InstagramIcon, href: "#" },
  { Icon: TwitterIcon, href: "#" },
];

export const PAYMENT_METHODS = [
  { src: "/images/payments/paypal.png", alt: "PayPal", name: "paypal" },
  { src: "/images/payments/amex.png", alt: "American Express", name: "amex" },
  { src: "/images/payments/visa.png", alt: "Visa", name: "visa" },
  { src: "/images/payments/maestro.png", alt: "Maestro", name: "maestro" },
  {
    src: "/images/payments/mastercard.png",
    alt: "Mastercard",
    name: "mastercard",
  },
  { src: "/images/payments/applepay.png", alt: "Apple Pay", name: "applepay" },
  { src: "/images/payments/klarna.png", alt: "Klarna", name: "klarna" },
  { src: "/images/payments/sofort.png", alt: "Sofort", name: "sofort" },
  { src: "/images/payments/vorkasse.png", alt: "Vorkasse", name: "vorkasse" },
];
