"use client";

import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

import { Link } from "@/i18n/routing";
import ArrowIcon from "@/icons/arrow.svg";

import { LINKS } from "./config";
import styles from "./FooterMenu.module.scss";

type ColumnProps = {
  name: string;
  children: React.ReactNode;
};

const DesctopColumn: FC<ColumnProps> = ({ name, children }) => {
  return (
    <div className={styles.column}>
      <p className={styles.label}>{name}</p>
      {children}
    </div>
  );
};

const MobileColumn: FC<ColumnProps> = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.column}>
      <motion.p
        className={styles.label}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        variants={{
          open: { marginBottom: 24 },
          closed: { marginBottom: 0 },
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.25, type: "tween" }}
      >
        <span>{name}</span>
        <motion.span
          variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.25, type: "tween" }}
        >
          <ArrowIcon />
        </motion.span>
      </motion.p>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.content}
            variants={{
              open: {
                opacity: 1,
                y: 0,
                height: "auto",
                visibility: "visible",
              },
              closed: {
                opacity: 0,
                height: 0,
                y: -10,
                visibility: "hidden",
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25, type: "tween" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FooterMenu = () => {
  const t = useTranslations("Footer");
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const Column = isMobile ? MobileColumn : DesctopColumn;

  return (
    <nav className={styles.nav}>
      {LINKS.map(({ name, list }) => (
        <Column key={name} name={t(name)}>
          <ul>
            {list.map(({ label, href }) => (
              <li key={label} className={styles.link}>
                <Link href={href}>{t(label)}</Link>
              </li>
            ))}
          </ul>
        </Column>
      ))}
      <Column name={t("contact")}>
        <ul className={styles.column}>
          <li className={styles.link}>SM MIR GmbH Berlin, Deutschland</li>
          <li className={styles.link}>info@cupidchoco.com</li>
          <li className={styles.link}>
            <a
              href="https://wa.me/4915226740425"
              rel="noreferrer nofollow"
              target="_blank"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </Column>
    </nav>
  );
};

export default FooterMenu;
