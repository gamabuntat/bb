import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import Layout from 'src/components/Layout/Layout';
import { getAllEpisodes, getCharacters } from 'src/api/api';
import type { Episode } from 'src/api/types';

// import styles from 'src/styles/Home.module.css';

const Home: NextPage = () => {
  const [episode, setEpisode] = useState([] as Episode[]);

  useEffect(() => {
    getAllEpisodes()
      .then((r) => {
        return r;
      })
      .then((r) => getCharacters(r[0][0].characters))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout>
      <div style={{ flex: 1 }}>{episode[0]?.episode}</div>
    </Layout>
  );
};

export default Home;
