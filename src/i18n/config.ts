import EnglishIcon from "@/icons/en.svg";
import DeutschIcon from "@/icons/de.svg";

export const LOCALES = ["en", "de"] as const;
export const DEFAULLT_LOCALE = "en";

export const LOCALES_DATE = {
  en: {
    label: "English",
    locale: "en-US",
    Icon: EnglishIcon,
  },
  de: {
    label: "Deutsch",
    locale: "de-DE",
    Icon: DeutschIcon,
  },
};
