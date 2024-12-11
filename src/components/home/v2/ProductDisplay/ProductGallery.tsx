"use client";

import { FC, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import { PRODUCT_GALLERY } from "./config";
import styles from "./ProductGallery.module.scss";
import "swiper/css/pagination";

type Props = {
  currentImage: number | null;
};

const Controller: FC<Props> = ({ currentImage }) => {
  const swiper = useSwiper();

  useEffect(() => {
    if (!currentImage) return;

    swiper.slideTo(currentImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  return null;
};

/**
 * ProductGallery component that displays a gallery of product images.
 * It uses Swiper for a responsive slider experience and includes thumbnails.
 *
 * @param {Props} props                      - The props for the ProductGallery component.
 * @param {number | null} props.currentImage - The index of the currently selected image.
 * @returns {JSX.Element}                    - The rendered ProductGallery component.
 */
export const ProductGallery: FC<Props> = ({ currentImage }): JSX.Element => {
  return (
    <div className={styles.wrapper} role="region" aria-label="Product images">
      <Swiper
        className={styles.slider}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
      >
        <Controller currentImage={currentImage} />
        {PRODUCT_GALLERY.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt="Product image"
              fill
              quality={80}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.thumbnails}>
        <div className={styles.thumbnail} />
        <div className={styles.thumbnail} />
        <div className={styles.thumbnail} />
      </div>
    </div>
  );
};
