import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Subscribe } from "@/components";
import {
  Advantages,
  Comments,
  FAQ,
  Gallery,
  Ingredients,
  Marquee,
  Recommendations,
  Slider,
  Stars,
  Video,
} from "@/components/home";

import { VIDEOS, MARQUEE_V1 } from "../config";
import styles from "./page.module.scss";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <Image
          src="/images/cupid-chocolate.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={1440}
          height={860}
          className={styles.image}
          priority
        />
        <div className={styles.content}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.text}>
            {t.rich("description", {
              span: (chunks) => <span>{chunks}</span>,
            })}
          </p>
          <Link href="/sex-chocolate" className={styles.button}>
            {t("by-now")}
          </Link>
          <Link href="/#reviews" className={styles.stars}>
            <p>
              <span>152</span> {t("verified-5-star-reviews")}
            </p>
            <Stars />
          </Link>
        </div>
      </div>
      <Marquee list={MARQUEE_V1} />
      <Advantages />
      <Recommendations />
      <Ingredients />
      <Slider title={t("what-our-customers-say")}>
        {VIDEOS.map((video, i) => (
          <Video
            description={video.description}
            key={i}
            poster={`/images/posters/${video.name}.webp`}
          >
            {["webm", "mp4"].map((ext, i) => (
              <source
                key={ext + i}
                src={`/videos/${video.name}.${ext}`}
                type={`video/${ext}`}
              />
            ))}
          </Video>
        ))}
      </Slider>
      <Gallery />
      <Comments />
      <FAQ />
      <Subscribe />
    </main>
  );
}
