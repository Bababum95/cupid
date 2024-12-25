import type { Variants } from "framer-motion";

export const REVIEWS = [
  {
    title: "Mehr als nur Schokolade",
    content:
      "Unser Liebesleben war am Boden, bis die Sexualtherapeutin Cupid empfahl. Jetzt läuft's wieder! Danke Cupid!",
    author: "Marie",
    date: "9. Dezember 2024",
  },
  {
    title: "Mehr als nur Schokolade",
    content:
      "Anfangs war ich skeptisch, aber die Wirkung war echt spürbar. Meine Partnerin war total begeistert und auch ich habe mich lebendiger gefühlt. Ehrlich gesagt, der ganze Abend fühlte sich intensiver an und ist definitiv in Erinnerung geblieben. Top Sache, würde ich echt weiterempfehlen.",
    author: "Jan",
    date: "11. November 2024",
  },
];

export const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};
