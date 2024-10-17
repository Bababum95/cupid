import { Product, ProductNode } from "@/types";

export const normalizeProductData = (productNode: ProductNode): Product => {
  const components = productNode.variants.edges.map((variant) => {
    return variant.node.components.edges.map((component) => {
      return {
        quantity: component.node.quantity,
      };
    });
  });

  const isBundle = components.some((component) => component.length > 0);

  return {
    id: productNode.id,
    title: productNode.title,
    images: productNode.images?.edges.map(({ node }) => node),
    price: {
      amount: parseFloat(productNode.priceRange.minVariantPrice.amount),
      currencyCode: productNode.priceRange.minVariantPrice.currencyCode,
    },
    components: isBundle ? components : null,
    isBundle,
  };
};
