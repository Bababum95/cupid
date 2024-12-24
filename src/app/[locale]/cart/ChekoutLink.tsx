"use client";

import { forwardRef } from "react";

type Props = {
  url: string;
};

const CheckoutLink = forwardRef<HTMLAnchorElement, Props>(({ url }, ref) => {
  return <a id="checkout-link" href={url} ref={ref}></a>;
});

CheckoutLink.displayName = "CheckoutLink";

export default CheckoutLink;
