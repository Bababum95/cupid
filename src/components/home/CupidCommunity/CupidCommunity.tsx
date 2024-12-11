import { useTranslations } from "next-intl";

import { Slider, Video } from "@/components/home";

import { VIDEOS } from "./config";

export const CupidCommunity = () => {
  const t = useTranslations("HomePage");
  return (
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
  );
};
