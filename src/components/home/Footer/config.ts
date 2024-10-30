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
      { label: "contact-us", href: "/contact" },
      { label: "faq", href: "/faq" },
      { label: "order", href: "/order" },
    ],
  },
  {
    name: "legal",
    list: [
      { label: "privacy", href: "/privacy" },
      { label: "terms", href: "/terms" },
      { label: "shiping", href: "/shiping" },
      { label: "imprint", href: "/imprint" },
      { label: "cookies", href: "/cookies" },
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
