"use client";

const CHECKOUT_DOMAIN = process.env.CHECKOUT_DOMAIN;

const ChekoutLink = () => {
  return (
    <a id="checkout-link" href={`https://${CHECKOUT_DOMAIN}/`} hidden>
      checkout
    </a>
  );
};

export default ChekoutLink;
