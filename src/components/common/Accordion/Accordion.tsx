"use client";

import { useRef, useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

import styles from "./Accordion.module.scss";

type Props = {
  data: string[];
  t: (key: string) => string;
};

export const Accordion: FC<Props> = ({ data, t }) => {
  const [expanded, setExpanded] = useState<false | number>(false);
  const stagerStart = useRef<number>(data.length);

  return (
    <ul className="list">
      <AnimatePresence initial={false}>
        {data.map((name, index) => {
          const isOpen = expanded === index;
          return (
            <motion.li
              className={classNames("item", styles.item, {
                [styles.open]: isOpen,
              })}
              key={name}
              initial={{ opacity: 0, x: -150, scale: 0.6 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.06 * (index - stagerStart.current),
                type: "keyframes",
              }}
            >
              <div
                className={classNames("opener", styles.top)}
                onClick={() => setExpanded(isOpen ? false : index)}
              >
                <p className={styles.label}>{t(name)}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={8}
                  height={12}
                  viewBox="0 0 8 12"
                  fill="none"
                >
                  <path
                    d="M7 1L2 6L7 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    className={classNames("content", styles.text)}
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto", marginTop: 8 },
                      collapsed: { height: 0, marginTop: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {t(`${name}-text`)}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
};