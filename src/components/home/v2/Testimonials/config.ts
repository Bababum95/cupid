import type { Variants } from "framer-motion";

export const REVIEWS = [
  {
    title: "Cupid Choco",
    content:
      "Unser Liebesleben war am Boden, bis uns die Sexualtherapeutin Cupid Choco empfahl. Seitdem hat sich alles verändert – die Verbindung zwischen uns ist intensiver, und wir genießen die gemeinsamen Momente viel mehr. Jetzt läuft’s wieder richtig gut! Danke Cupid!",
    author: "Marie",
    date: "13. November 2024",
  },
  {
    title: "Cupid Choco",
    content:
      "Ich bin begeistert von Cupid Choco! Die Schokolade schmeckt nicht nur großartig, sondern hat auch eine spürbare Wirkung auf die Intimität in meiner Beziehung. Seitdem ich sie regelmäßig genieße, fühlt sich alles viel intensiver an. Sehr empfehlenswert!",
    author: "Jan",
    date: "13. November 2024",
  },
];

export const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};
