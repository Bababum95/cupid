"use client";

import { FC, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import TextareaAutosize from "react-textarea-autosize";

import { Button, Input, SubmitButton } from "@/components";
import { useScrollbarWidth } from "@/hooks";
import StarIcon from "@/icons/star.svg";

import styles from "./NewComment.module.scss";

const Popup = dynamic(() => import("@/components/dynamic/Popup"), {
  ssr: false,
});

export const NewComment: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    content: "",
    rating: 0,
  });
  const t = useTranslations("Comments");
  const formRef = useRef<HTMLFormElement>(null);
  useScrollbarWidth();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log("submit", evt);
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const open = () => {
    document.body.classList.add("no-scroll");
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);

    setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }, 200);
  };

  return (
    <>
      <Button variant="secondary" onClick={open} className={styles.button}>
        {t("write-review")}
      </Button>

      <Popup isOpen={isOpen} onClose={close} size="large">
        <form className={styles.content} onSubmit={handleSubmit} ref={formRef}>
          <p className={styles.title}>{t("my-rewiew")}</p>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                fill={i < values.rating ? "#520C11" : "none"}
                stroke={i < values.rating ? "#520C11" : "#333333"}
                onClick={() => setValues({ ...values, rating: i + 1 })}
                width={42}
                height={42}
                viewBox="0 0 24 24"
                role="button"
                tabIndex={0}
                aria-label={`Rating ${i + 1}`}
              />
            ))}
          </div>
          <fieldset name="user" className={styles.user}>
            <Input
              name="name"
              placeholder={`${t("name")} *`}
              required
              onChange={handleChange}
              value={values.name}
            />
            <Input
              name="email"
              placeholder="Email *"
              required
              onChange={handleChange}
              value={values.email}
              type="email"
            />
          </fieldset>
          <TextareaAutosize
            required
            name="content"
            placeholder={t("review")}
            className={styles.review}
            onChange={handleChange}
            value={values.content}
          />
          <SubmitButton
            label={t("submit")}
            isActive={values.rating > 0 && !!formRef.current?.checkValidity()}
          />
        </form>
      </Popup>
    </>
  );
};
