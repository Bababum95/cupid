export const REGULAR_PRICE = 37;
export const PRODUCT_VARIANTS = [
  {
    quantity: 1,
    price: 29.99,
    savings: { percentage: "19%" },
    id: "gid://shopify/ProductVariant/49588357693764",
    // id: "gid://shopify/ProductVariant/54142759469405", //dev
    image: "10",
  },
  {
    quantity: 2,
    price: 27.79,
    savings: { percentage: "25%", gifts: 1 },
    id: "gid://shopify/ProductVariant/49444215423300",
    discountCodes: ["H3PKCHWNE2WY"],
    gifts: [
      {
        merchandiseId: "gid://shopify/ProductVariant/49590020079940",
        quantity: 1,
      },
    ],
    image: "11",
    recommended: true,
  },
  {
    quantity: 3,
    price: 24.99,
    savings: { percentage: "33%", gifts: 2 },
    id: "gid://shopify/ProductVariant/49588801634628",
    discountCodes: ["H3PKCHWNE2WY", "7EN4E2DCBDVB"],
    gifts: [
      {
        merchandiseId: "gid://shopify/ProductVariant/49590020079940",
        quantity: 1,
      },
      {
        merchandiseId: "gid://shopify/ProductVariant/49590023422276",
        quantity: 1,
      },
    ],
    image: "12",
  },
];

export const SHIPPING_FEATURES = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ec801570ea58e793b8983f784c68b9a6c16f20c47d53d264c5e61f0b0546964?placeholderIfAbsent=true&apiKey=088c19ac2d1b43cc829ac505698cd511",
    text: "free-shipping",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/01e0c995f49ca436c9975b953fdc7f87d20532320b3d24470737fe8e48dbf961?placeholderIfAbsent=true&apiKey=088c19ac2d1b43cc829ac505698cd511",
    text: "satisfaction-guarantee",
    large: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/968bb25aa389fc2ce0269b89e8675290283073257c8d574da83dc562059fc910?placeholderIfAbsent=true&apiKey=088c19ac2d1b43cc829ac505698cd511",
    text: "discrete-packaging",
  },
];

export const PRODUCT_FEATURES = [
  "works-for-men-and-women",
  "natural",
  "superfood",
  "germany",
];
