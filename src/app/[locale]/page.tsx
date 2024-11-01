import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import {
  Header,
  Advantages,
  FAQ,
  Gallery,
  Ingredients,
  Comments,
  Subscribe,
  Footer,
  Slider,
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
            <Video src={video.src} description={video.description} key={i} />
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
