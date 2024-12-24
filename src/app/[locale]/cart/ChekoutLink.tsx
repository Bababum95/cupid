"use client";

// const CHECKOUT_DOMAIN = process.env.CHECKOUT_DOMAIN;

type Props = {
  url: string;
};

const ChekoutLink = ({ url }: Props) => {
  return (
    <a id="checkout-link" href={url}>
      checkout
    </a>
  );
};

export default ChekoutLink;
