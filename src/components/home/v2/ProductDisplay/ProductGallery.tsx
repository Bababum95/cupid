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
  locale: "en" | "de";
};

const Controller: FC<{ currentImage: number | null }> = ({ currentImage }) => {
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
export const ProductGallery: FC<Props> = ({
  currentImage,
  locale,
}): JSX.Element => {
  return (
    <div className={styles.wrapper} role="region" aria-label="Product images">
      <Swiper
        className={styles.slider}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
      >
        <Controller currentImage={currentImage} />
        {PRODUCT_GALLERY.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.type === "image" && (
              <Image
                src={slide.src[locale]}
                alt="Product image"
                fill
                quality={95}
                className={styles.image}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.thumbnails}>
        <Image
          className={styles.thumbnail}
          src="/images/home/v2/1.jpg"
          alt="Girl with a chocolate"
          width={758}
          height={322}
          quality={90}
        />
        <Image
          className={styles.thumbnail}
          src="/images/home/v2/ingredients/1.jpg"
          alt="Chocolate"
          width={369}
          height={322}
          quality={80}
        />
        <Image
          className={styles.thumbnail}
          src="/images/home/v2/2.jpg"
          alt="Girl eating a chocolate"
          width={369}
          height={322}
          quality={80}
        />
      </div>
    </div>
  );
};
