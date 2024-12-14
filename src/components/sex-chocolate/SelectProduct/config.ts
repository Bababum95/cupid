import type { Variant } from "motion/react";

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
