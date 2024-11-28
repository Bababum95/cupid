import type { Variant } from "motion/react";

export const CIRCLE_INITIAL = { stroke: "#E9E9E9", fill: "#520c1100" };
export const CIRCLE_ACTIVE = { stroke: "#520C11", fill: "#520C11" };
export const ITEM_INITIAL = {
  backgroundColor: "rgba(51, 51, 51, 0)",
  borderColor: "#1a1a1a",
};
export const ITEM_ACTIVE = {
  backgroundColor: "rgba(51, 51, 51, 0.1)",
  borderColor: "#520C11",
};
export const ITEM_HOVER = {
  borderColor: "#333",
  backgroundColor: "rgba(51, 51, 51, 0.1)",
};
export const GIFT_INITIAL: Variant = {
  marginBottom: 0,
  opacity: 0,
  y: -100,
  visibility: "hidden",
  height: 0,
};
export const GIFT_ACTIVE: Variant = {
  marginBottom: 28,
  opacity: 1,
  y: 0,
  visibility: "visible",
  height: "auto",
};
export const HIDDEN_STEP: Variant = {
  opacity: 0,
  visibility: "hidden",
  display: "none",
  transition: { duration: 0.25, type: "tween" },
};

export const VISIBLE_STEP: Variant = {
  opacity: 1,
  visibility: "visible",
  display: "block",
  transition: { duration: 0.25, type: "tween", delay: 0.25 },
};
export const STEP_VARIANTS = {
  hidden: HIDDEN_STEP,
  visible: VISIBLE_STEP,
};
