type Params = {
  sourceUrl: string;
  targetUrl: string;
  locale: string;
};

export const prepearCheckoutURL = ({
  sourceUrl,
  targetUrl,
  locale,
}: Params) => {
  const source = new URL(sourceUrl);
  const target = new URL(targetUrl);

  const sourceParams = new URLSearchParams(source.search);

  sourceParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  target.searchParams.set("locale", locale);

  return target.toString();
};
