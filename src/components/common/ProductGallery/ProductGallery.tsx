"use client";

import { FC, useEffect, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import ArrowIcon from "@/icons/arrow.svg";

import { PRODUCT_GALLERY } from "./config";
import styles from "./ProductGallery.module.scss";
import "swiper/css/pagination";

type Props = {
  currentImage: number | null;
  locale: "en" | "de";
};

/**
 * Controller component that manages the swiper instance and handles navigation.
 *
 * @param {Props} props - The props for the Controller component.
 * @param {number | null} props.currentImage - The current slide index or null if not set.
 * @returns {JSX.Element} - The rendered Controller component.
 */
const Controller: FC<{ currentImage: number | null }> = ({
  currentImage,
}): JSX.Element => {
  const swiper = useSwiper();

  useEffect(() => {
    if (!currentImage) return;

    swiper.slideTo(currentImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  return (
    <div className={styles.controller}>
      <button
        aria-label="Previous slide"
        className={styles.button}
        onClick={() => swiper.slidePrev()}
      >
        <ArrowIcon />
      </button>
      <button
        aria-label="Next slide"
        className={styles.button}
        onClick={() => swiper.slideNext()}
      >
        <ArrowIcon />
      </button>
    </div>
  );
};

type VideoProps = {
  files: ReadonlyArray<{
    src: string;
    type: string;
  }>;
};

/**
 * Video component that plays a video file based on the provided file sources.
 * It uses Swiper to manage playback and transitions between slides.
 *
 * @param {VideoProps} props - The props for the Video component.
 * @param {ReadonlyArray<{ src: string; type: string }>} props.files - An array of video file sources and their types.
 * @returns {JSX.Element} - The rendered Video component.
 */
const Video: FC<VideoProps> = ({ files }): JSX.Element => {
  const { isActive } = useSwiperSlide();
  const videoRef = useRef<HTMLVideoElement>(null);
  const swiper = useSwiper();

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.play();
      swiper.autoplay.stop();
    } else {
      if (swiper?.autoplay && !swiper.autoplay.running) {
        swiper.autoplay.start();
      }
      videoRef.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <video
      className={styles.media}
      muted
      playsInline
      preload="auto"
      ref={videoRef}
      onEnded={() => swiper.slideNext()}
    >
      {files.map((file, index) => (
        <source key={index} src={file.src} type={file.type} />
      ))}
    </video>
  );
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
    <Swiper
      className={styles.slider}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
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
              className={styles.media}
              priority
              quality={90}
            />
          )}
          {slide.type === "video" && <Video files={slide.files} />}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
