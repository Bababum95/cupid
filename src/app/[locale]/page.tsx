import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { Subscribe, Header, Footer } from "@/components";
import {
  Advantages,
  Comments,
  FAQ,
  Gallery,
  Ingredients,
  LangSwitcher,
  Recommendations,
  Slider,
  Video,
} from "@/components/home";
import { DEFAULLT_LOCALE } from "@/i18n/config";

import { VIDEOS } from "./config";
import styles from "./page.module.scss";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("HomePage");
  const cookieStore = cookies();

  return (
    <>
      {!cookieStore.has("LS") && locale === DEFAULLT_LOCALE && <LangSwitcher />}
      <Header />
      <main className={styles.page}>
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
            {t.rich("description", { span: (chunks) => <span>{chunks}</span> })}
          </p>
          <Link href="/sex-chocolate" className={styles.button}>
            {t("by-now")}
          </Link>
        </div>
        <Advantages />
        <Recommendations />
        <Ingredients />
        <Slider title={t("what-our-customers-say")}>
          {VIDEOS.map((video, i) => (
            <Video
              description={video.description}
              key={i}
              poster={`/images/posters/${video.name}.png`}
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
