import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptPT from "date-fns/locale/pt";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos Uploads</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li>
                <a href="#" key={episode.id}>
                  {episode.title}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}></section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptPT,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, //faz um novo pedido de 8 em 8 horas
  };
};
