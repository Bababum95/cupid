import { FC } from "react";
import { motion } from "framer-motion";

import { Price } from "@/components";

import { GIFT_INITIAL, GIFT_ACTIVE } from "./config";
import type { GiftType } from "./types";
import styles from "./Gift.module.scss";

type Props = {
  gifts: GiftType[];
  isActive: boolean;
};

export const Gift: FC<Props> = ({ gifts, isActive }) => {
  return (
    <motion.div
      className={styles.wrapper}
      initial={GIFT_INITIAL}
      transition={{ duration: 0.35 }}
      animate={isActive ? GIFT_ACTIVE : GIFT_INITIAL}
    >
      {!!gifts.length && (
        <>
          <p className={styles.name}>{gifts[0].title}</p>
          <Price
            price={`0,00 ${gifts[0].price[gifts[0].price.length - 1]}`}
            old={gifts[0].price}
          />
        </>
      )}
    </motion.div>
  );
};
