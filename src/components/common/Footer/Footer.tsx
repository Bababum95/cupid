import { useTranslations } from "next-intl";
import Image from "next/image";
import dynamic from "next/dynamic";

import LogoIcon from "@/icons/footer-logo.svg";

import { SOCIAL_LINKS, PAYMENT_METHODS } from "./config";
import styles from "./Footer.module.scss";

const FooterMenu = dynamic(() => import("@/components/dynamic/FooterMenu"), {
  ssr: false,
});

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
                <a
                  key={i}
                  href={href}
                  className={styles.social}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  <Icon width={28} height={28} />
                </a>
              ))}
            </nav>
          </div>
          <p className={styles.description}>{t("description")}</p>
        </div>
        <FooterMenu />
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
              quality={95}
            />
          ))}
        </div>
        <p className={styles.copyright}>2024 Cupid®</p>
      </div>
    </footer>
  );
};
