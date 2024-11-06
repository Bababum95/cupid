"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Controller } from "./Controller";

import "swiper/css";

import styles from "./Slider.module.scss";

type Props = {
  title: string;
  children: React.ReactNode[];
  gap?: number;
};

export const Slider: FC<Props> = ({ title, children, gap = 20 }) => {
  return (
    <Swiper className={styles.section} spaceBetween={gap} slidesPerView="auto">
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
