"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Controller } from "./Controller";

import "swiper/css";

import styles from "./Slider.module.scss";

type Props = {
  /** The title to display above the slider */
  title: string;
  /** The child elements (slides) to render inside the slider */
  children: React.ReactNode[];
  /**
   * The gap (space in pixels) between slides.
   * Defaults to `DEFAULT_GAP`, but will be overridden by `MOBILE_GAP` on mobile screens.
   * @default 20
   */
  gap?: number;
};

// Default gap constants
const MOBILE_GAP = 20;
const DEFAULT_GAP = 20;

/**
 * A responsive slider component using Swiper with custom gaps and a controller.
 *
 * Displays a title, and maps over `children` to render each as a `SwiperSlide`.
 * Includes a mobile-specific gap setting and uses the specified `gap` for larger screens.
 *
 * @param {Props} props - The props object for the component.
 * @param {string} props.title - The title text displayed above the slider.
 * @param {React.ReactNode[]} props.children - An array of slides as React nodes.
 * @param {number} [props.gap=20] - The gap between slides on larger screens. Defaults to 20.
 *
 * @example
 * <Slider title="Featured Products" gap={30}>
 *   <ProductCard product={product1} />
 *   <ProductCard product={product2} />
 * </Slider>
 */
export const Slider: FC<Props> = ({ title, children, gap = DEFAULT_GAP }) => {
  return (
    <Swiper
      className={styles.section}
      spaceBetween={gap}
      slidesPerView="auto"
      breakpoints={{
        0: {
          spaceBetween: MOBILE_GAP,
        },
        768: {
          spaceBetween: gap,
        },
      }}
    >
      <div className={styles.header} slot="container-start">
        <h2 className={styles.title}>{title}</h2>
        <Controller />
      </div>
      {children.map((child, i) => (
        <SwiperSlide key={i} className={styles.slide}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
