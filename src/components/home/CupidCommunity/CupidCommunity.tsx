import type { FC } from "react";
import { useTranslations } from "next-intl";

import { Slider, Video } from "@/components/home";

import { VIDEOS } from "./config";

type Props = {
  version: "V1" | "V2";
};

export const CupidCommunity: FC<Props> = ({ version }) => {
  const t = useTranslations("HomePage.CupidCommunity");
  return (
    <Slider title={t(version)} controller={false}>
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
