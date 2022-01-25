import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import { getAllEpisodes } from 'src/api/api';
import type { Episode } from 'src/api/types';
import Layout from 'src/components/Layout/Layout';
import Carousel from 'src/components/Carousel/Carousel';

import styles from 'src/styles/Home.module.sass';

const Home: NextPage = () => {
  const [episodes, setEpisode] = useState([] as Episode[][]);

  useEffect(() => {
    getAllEpisodes().then(setEpisode);
  }, []);

  return (
    <Layout>
      <main className={styles.Main}>
        {episodes.map((ep) => (
          <section key={ep[0].season}>
            <h2 className={styles.SeasonTitle}>Season {ep[0].season}</h2>
            <Carousel episodes={ep} />
          </section>
        ))}
      </main>
    </Layout>
  );
};

export default Home;
