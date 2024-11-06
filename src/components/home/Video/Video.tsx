"use client";

import { FC, useRef, useState } from "react";
import classNames from "classnames";

import PlayIcon from "@/icons/play.svg";
import TiktokIcon from "@/icons/tiktok.svg";
import SoundIcon from "@/icons/sound.svg";
import MuteIcon from "@/icons/sound-speaker.svg";

import styles from "./Video.module.scss";

type Props = {
  description: string;
  poster: string;
  children: React.ReactNode;
};

export const Video: FC<Props> = ({ description, poster, children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.wrapper, {
          [styles.playing]: isPlaying,
        })}
      >
        <video
          className={styles.video}
          loop
          ref={videoRef}
          muted={isMuted}
          preload="metadata"
          poster={poster}
        >
          {children}
        </video>
        <button className={styles.play} onClick={togglePlay}>
          <PlayIcon />
        </button>
        <div className={styles.footer}>
          <span className={styles.icon}>
            <TiktokIcon width={28} height={28} />
          </span>
          <span className={styles.tiktok}>TikTok</span>
          <button
            className={classNames(styles.sound, { [styles.muted]: isMuted })}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MuteIcon /> : <SoundIcon />}
          </button>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
