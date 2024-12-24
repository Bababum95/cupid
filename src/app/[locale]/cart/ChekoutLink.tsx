"use client";

import { forwardRef } from "react";

import styles from "./CheckoutLink.module.scss";

type Props = {
  url: string;
  children?: React.ReactNode;
};

const CheckoutLink = forwardRef<HTMLAnchorElement, Props>(({ url }, ref) => (
  <a id="checkout-link" className={styles.link} href={url} ref={ref}>
    Checkout
  </a>
));

CheckoutLink.displayName = "CheckoutLink";

export default CheckoutLink;
