import { useTranslations } from "next-intl";
import Image from "next/image";

import LogoIcon from "@/icons/footer-logo.svg";

import { LINKS, SOCIAL_LINKS, PAYMENT_METHODS } from "./config";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.top}>
            <LogoIcon />
            <nav className={styles.socials}>
              {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                <a key={i} href={href} className={styles.social}>
                  <Icon width={28} height={28} />
                </a>
              ))}
            </nav>
          </div>
          <p className={styles.description}>{t("description")}</p>
        </div>
        <nav className={styles.nav}>
          {LINKS.map(({ name, list }) => (
            <ul key={name}>
              <li className={styles.label}>{t(name)}</li>
              {list.map(({ label, href }) => (
                <li key={label} className={styles.link}>
                  <a href={href}>{t(label)}</a>
                </li>
              ))}
            </ul>
          ))}
          <ul>
            <li className={styles.label}>{t("contact")}</li>
            <li className={styles.link}>SM MIR GmbH Berlin, Deutshland</li>
            <li className={styles.link}>info@cupidchoco.com</li>
            <li className={styles.link}>WhatsApp</li>
          </ul>
        </nav>
      </div>
      <span className={styles.divider} />
      <div className={styles.wrapper}>
        <div className={styles.payments}>
          {PAYMENT_METHODS.map(({ alt, src }, i) => (
            <Image
              className={styles.payment}
              key={i}
              alt={alt}
              src={src}
              width={70}
              height={28}
            />
          ))}
        </div>
        <p className={styles.copyright}>2024 Cupid®</p>
      </div>
    </footer>
  );
};
