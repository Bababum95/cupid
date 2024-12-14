"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import TextareaAutosize from "react-textarea-autosize";

import type { Notice as NoticeType } from "@/types";
import { Button, Input, SubmitButton, Notice } from "@/components";
import { useScrollbarWidth } from "@/hooks";
import { useAddCommentMutation } from "@/lib/slices/api";
import StarIcon from "@/icons/star.svg";

import { COMMENT_DEFAULTS } from "./config";
import styles from "./NewComment.module.scss";

const Popup = dynamic(() => import("@/components/dynamic/Popup"), {
  ssr: false,
});

type Props = {
  accentColor: string;
};

export const NewComment: FC<Props> = ({ accentColor }) => {
  const t = useTranslations("HomePage.Comments");

  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<NoticeType | null>(null);
  const [values, setValues] =
    useState<typeof COMMENT_DEFAULTS>(COMMENT_DEFAULTS);
  const [addComment, { isLoading, isSuccess, isError, error }] =
    useAddCommentMutation();
  const formRef = useRef<HTMLFormElement>(null);
  useScrollbarWidth();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    addComment({ ...values, pageId: "home" });
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setNotice({
        title: t("notices.success.title"),
        description: t("notices.success.description"),
      });
      setValues(COMMENT_DEFAULTS);
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if ("data" in error) {
        const errorData = error.data as {
          message: NoticeType;
          fealds?: string[];
        };

        if (errorData.message?.title) {
          const message: NoticeType = {
            title: t(errorData.message.title),
          };

          if (errorData.message.description) {
            message.description = t(errorData.message.description);
          }

          setNotice(message);
          return;
        }
      }

      setNotice({
        title: t("notices.500.title"),
        description: t("notices.500.description"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

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
                fill={i < values.rating ? accentColor : "none"}
                stroke={i < values.rating ? accentColor : "#333333"}
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
            name="message"
            placeholder={t("review")}
            className={styles.review}
            onChange={handleChange}
            value={values.message}
          />
          <SubmitButton
            label={t("submit")}
            isActive={values.rating > 0 && !!formRef.current?.checkValidity()}
            isLoading={isLoading}
          />
        </form>
      </Popup>
      <div className={styles.notice}>
        <Notice
          message={notice}
          success={isSuccess}
          clear={() => setNotice(null)}
        />
      </div>
    </>
  );
};
