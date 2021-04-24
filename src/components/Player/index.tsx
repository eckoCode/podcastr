import { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    setPlayingState,
    togglePlay,
  } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];
  

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="A Tocar" />
        <strong>A Tocar </strong>
      </header>
      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#84d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#84d361", borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => {
              setPlayingState(true);
            }}
            onPause={() => {
              setPlayingState(false);
            }}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Aleatório" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Musica Anterior" />
          </button>
          <button
            type="button"
            disabled={!episode}
            className={styles.playButton}
            onClick={() => {
              togglePlay();
            }}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="tocar" />
            ) : (
              <img src="/play.svg" alt="tocar" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Proxima Musica" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Tocar novamente" />
          </button>
        </div>
      </footer>
    </div>
  );
}
