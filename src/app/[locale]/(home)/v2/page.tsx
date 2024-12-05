import { useTranslations } from "next-intl";

import {
  Comments,
  Marquee,
  Slider,
  Video,
  ProductDisplay,
  Testimonials,
  Supergreens,
} from "@/components/home";

import { VIDEOS, MARQUEE_V2 } from "../config";
import styles from "./page.module.scss";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <main className={styles.page}>
      <Marquee list={MARQUEE_V2} />
      <ProductDisplay />
      <Testimonials />
      <Supergreens />
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
      <Comments />
    </main>
  );
}
