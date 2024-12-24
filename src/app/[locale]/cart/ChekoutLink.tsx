"use client";

import { forwardRef } from "react";

import styles from "./CheckoutLink.module.scss";

type Props = {
  url: string;
};

const CheckoutLink = forwardRef<HTMLAnchorElement, Props>(({ url }, ref) => {
  return (
    <a id="checkout-link" className={styles.link} href={url} ref={ref}>
      Checkout
    </a>
  );
});

CheckoutLink.displayName = "CheckoutLink";

export default CheckoutLink;
