"use client";

import { useEffect } from "react";

const ChekoutLink = () => {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(window.gtag?.get("linkerParam"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <a href="https://pay.cupidchoco.com/">checkout</a>;
};

export default ChekoutLink;
