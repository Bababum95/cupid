type Section = {
  key: string;
  image?: {
    src: string;
    alt: string;
  };
};

export const SECTIONS: Section[] = [
  {
    key: "introduction",
    image: {
      src: "FAQ.jpg",
      alt: "Romantic Couple Sharing Chocolate",
    },
  },
  { key: "historical" },
  { key: "ingredients" },
  { key: "studies" },
  { key: "conclusion" },
];
