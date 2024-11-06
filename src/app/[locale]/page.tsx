import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import {
  Advantages,
  Comments,
  FAQ,
  Footer,
  Gallery,
  Header,
  Ingredients,
  Slider,
  Subscribe,
  Video,
} from "@/components/home";

import { VIDEOS } from "./config";
import styles from "./page.module.scss";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <>
      <Header />
      <main className={styles.page}>
        <Image
          src="/images/preview.jpg"
          alt="Cupid Aphrodisiac Chocolate"
          width={1440}
          height={860}
          className={styles.image}
          priority
        />
        <div className={styles.content}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.text}>
            {t.rich("description", { span: (chunks) => <span>{chunks}</span> })}
          </p>
          <Link href="/sex-chocolate" className={styles.button}>
            {t("by-now")}
          </Link>
        </div>
        <Advantages />
        <Ingredients />
        <Slider title={t("what-our-customers-say")}>
          {VIDEOS.map((video, i) => (
            <Video
              description={video.description}
              key={i}
              poster={`/posters/${video.name}.png`}
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
      <Footer />
    </>
  );
}
