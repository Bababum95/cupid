import { priceFragment } from "@/graphql";

export const giftFragment = `
fragment GiftFragment on Product {
    title
    variants(first: 1) {
        nodes {
            id
            price {
            ...PriceFragment
            }
        }
    }
    code: metafield(key: "code" namespace: "product") {
        value
    }
}
${priceFragment}`;
