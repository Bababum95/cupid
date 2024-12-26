"use client";

import type { FC } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Link from "next/link";

import LogoIcon from "@/icons/logotype.svg";

import styles from "./SideDrawer.module.scss";

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  children?: React.ReactNode;
};

/**
 * SideDrawer Component
 *
 * A sliding drawer component that supports animations, swipe gestures for closing,
 * and dynamic positioning (left or right).
 *
 * @param {Object} props - The props for the SideDrawer component.
 * @param {string} [props.title] - The title of the side drawer. If omitted, a logo is displayed.
 * @param {boolean} props.isOpen - Controls the visibility of the side drawer.
 * @param {() => void} props.onClose - Callback function triggered when the drawer is closed.
 * @param {"left" | "right"} [props.side="right"] - Specifies the side from which the drawer slides in.
 * @param {React.ReactNode} [props.children] - Content to be displayed inside the side drawer.
 * @returns {JSX.Element} The rendered SideDrawer component.
 */
const SideDrawer: FC<Props> = ({
  title,
  onClose,
  isOpen,
  side = "right",
  children,
}): JSX.Element => {
  /**
   * Handles the swipe (drag) event and closes the drawer if swiped in the correct direction.
   *
   * @param {MouseEvent | TouchEvent | PointerEvent} _event - The drag event object.
   * @param {PanInfo} info - Information about the drag motion, including offset and velocity.
   */
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // Check swipe direction and close the drawer if it matches the condition
    if (
      (side === "left" &&
        ((offsetX < -50 && velocityX < -500) || offsetX < -120)) ||
      (side === "right" && ((offsetX > 50 && velocityX > 500) || offsetX > 120))
    ) {
      onClose();
    }
  };
  return ReactDOM.createPortal(
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={onClose}
            initial="close"
            animate="open"
            exit="close"
            key="overlay"
            variants={{ open: { opacity: 1 }, close: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            aria-label={title}
            role="complementary"
            className={classNames(styles.wrapper, styles[side])}
            initial="close"
            animate="open"
            exit="close"
            key="drawer"
            drag="x"
            dragDirectionLock={true}
            dragMomentum={false}
            dragConstraints={
              side === "left"
                ? { left: -500, right: 0 }
                : { left: 0, right: 500 }
            }
            dragElastic={0.01}
            dragSnapToOrigin
            onDragEnd={handleDragEnd}
            variants={{
              open: { x: 0 },
              close: { x: side === "left" ? "-100%" : "100%" },
            }}
            transition={{ duration: 0.35, type: "tween" }}
          >
            <header className={styles.header}>
              {title ? (
                <h2 className={styles.title}>{title}</h2>
              ) : (
                <Link href="/" className={styles.logo}>
                  <LogoIcon />
                </Link>
              )}
              <button
                aria-label="Close button"
                onClick={onClose}
                type="button"
                className={styles.close}
              >
                <Line rotate={45} />
                <Line rotate={-45} />
              </button>
            </header>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

type LineProps = {
  rotate: number;
};

/**
 * Line Component
 *
 * A small animated line used for the close button design.
 *
 * @param {Object} props        - The props for the Line component.
 * @param {number} props.rotate - The angle to rotate the line.
 * @returns {JSX.Element}       - The rendered Line component.
 */
const Line: FC<LineProps> = ({ rotate }): JSX.Element => {
  return (
    <motion.span
      className={styles.line}
      initial="close"
      animate="open"
      exit="close"
      key="line"
      variants={{ open: { rotate }, close: { rotate: 0 } }}
      transition={{ duration: 0.15, type: "tween", delay: 0.05 }}
    />
  );
};

export default SideDrawer;
