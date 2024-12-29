"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import classNames from "classnames";
import Cookies from "js-cookie";

import type { SubscribeResponse } from "@/types";
import { SubmitButton, Input } from "@/components";
import { useSubscribeMutation } from "@/lib/slices/api";
import { useRouter } from "@/i18n/routing";
import LogoIcon from "@/icons/logotype.svg";
import SuccessIcon from "@/icons/success.svg";

import { VARIANTS, DELAY } from "./config";
import styles from "./SubscribePopup.module.scss";

const Popup = dynamic(() => import("@/components/dynamic/Popup"), {
  ssr: false,
});

const SubscribePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [subscribe, { isLoading, error, data }] = useSubscribeMutation();
  const t = useTranslations("Subscribe");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    subscribe({ email: value });
  };

  const close = () => {
    setIsOpen(false);
  };

  const goToShoping = () => {
    const link =
      Cookies.get("variant") === "2" ? "/#product" : "/sex-chocolate";
    router.push(link);
    close();
  };

  return (
    <Popup isOpen={isOpen} onClose={close} size="full" className={styles.popup}>
      <div className={styles.wrapper}>
        <Image
          className={styles.image}
          src="/images/subscribe-popup/5b10ab4f223a0100aa3a62fa9df7d372.jpeg"
          alt="Cupid Aphrodisiac Chocolate"
          width={409}
          height={438}
        />
        <div className={styles.content}>
          <LogoIcon width={71} height={31} viewBox="0 0 60 26" />
          <AnimatePresence initial={false}>
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              variants={VARIANTS}
              initial="visible"
              animate={data ? "hidden" : "visible"}
              transition={{ duration: 0.2, type: "tween" }}
              key="form"
            >
              <p className={styles.title}>{t("popup.title")}</p>
              <p className={styles.text}>{t("popup.description")}</p>
              <Input
                placeholder={t("placeholder")}
                type="email"
                value={value}
                name="email"
                onChange={(e) => setValue(e.target.value)}
                className={classNames(styles.input, {
                  [styles.error]: error,
                })}
              />
              {error && "data" in error && (
                <p className={styles["error-message"]}>
                  {(error.data as SubscribeResponse).message.title}
                </p>
              )}
              <SubmitButton
                label={t("popup.button")}
                isActive={true}
                isLoading={isLoading}
              />
              <p className={styles.description}>
                {t.rich("description", {
                  a: (children) => <a href="/privacy-policy">{children}</a>,
                })}
              </p>
            </motion.form>
            <motion.div
              className={styles.success}
              variants={VARIANTS}
              animate={data ? "visible" : "hidden"}
              transition={{ duration: 0.2, type: "tween", delay: 0.2 }}
              key="success"
            >
              <SuccessIcon width={60} height={60} viewBox="0 0 60 60" />
              <p className={styles.title}>{t("popup.success")}</p>
              <p className={styles.text}>
                {t.rich("popup.success-description", {
                  email: value,
                  span: (chunks) => <span>{chunks}</span>,
                })}
              </p>
              <button className={styles.button} onClick={goToShoping}>
                {t("popup.success-button")}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Popup>
  );
};

export default SubscribePopup;
