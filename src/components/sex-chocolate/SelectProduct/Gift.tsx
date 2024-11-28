import { FC } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Price } from "@/components";
import type { GiftType } from "@/types";

import { GIFT_INITIAL, GIFT_ACTIVE } from "./config";
import styles from "./Gift.module.scss";

type Props = {
  gifts: GiftType[];
  isActive: boolean;
};

export const Gift: FC<Props> = ({ gifts, isActive }) => {
  return (
    <AnimatePresence initial={false} key="gift">
      {isActive && (
        <motion.div
          variants={{
            open: GIFT_ACTIVE,
            closed: GIFT_INITIAL,
          }}
          initial="closed"
          animate={isActive ? "open" : "closed"}
          exit="closed"
          transition={{ duration: 0.35, type: "tween" }}
          key="gift"
        >
          <div className={styles.wrapper}>
            {!!gifts.length && (
              <>
                <p className={styles.name}>{gifts[0].title}</p>
                <Price
                  price={`0,00 ${gifts[0].price[gifts[0].price.length - 1]}`}
                  old={gifts[0].price}
                />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
