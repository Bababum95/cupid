import type { Image, Price, PriceNode } from "@/types";

type ComponentType = {
  quantity: number;
};

type MetafieldType = {
  value: string;
} | null;

type TextNode = {
  type: "text";
  value: string;
};

type ParagraphNode = {
  type: "paragraph";
  children: TextNode[];
};

type ListItemNode = {
  type: "list-item";
  children: TextNode[];
};

type ListNode = {
  type: "list";
  listType: "unordered" | "ordered";
  children: ListItemNode[];
};

type RichTextNode = {
  type: "root";
  children: (ListNode | ParagraphNode)[];
};

export type UnitPriceMeasurementType = {
  measuredType: "WEIGHT";
  quantityUnit: "G" | "KG";
  quantityValue: number;
  referenceUnit: "KG" | "G";
  referenceValue: number;
};

export type VariantProductType = {
  id: string;
  components: ComponentType[];
  image: Image;
  price: Price;
  compareAtPrice: Price | null;
  title: string;
  description: string | null;
  unitPriceMeasurement: UnitPriceMeasurementType | null;
};

export type ProductType = {
  title: string;
  description: string;
  bage?: string | null;
  featuredImage: Image;
  ingredients?: RichTextNode;
  "product-details"?: RichTextNode;
  "how-to-use"?: RichTextNode;
  variants: VariantProductType[];
};

export type ProductNode = {
  handle?: string;
  id?: string;
  title: string;
  featuredImage: Image;
  description: string;
  ingredients?: MetafieldType;
  details?: MetafieldType;
  how_to_use?: MetafieldType;
  bage?: MetafieldType;
  priceRange?: {
    minVariantPrice?: PriceNode;
  };
  variants: {
    nodes: {
      id: string;
      title: string;
      description: MetafieldType;
      image: Image;
      price: PriceNode;
      compareAtPrice: PriceNode | null;
      components: {
        nodes: ComponentType[];
      };
      unitPriceMeasurement: UnitPriceMeasurementType | null;
    }[];
  };
};
