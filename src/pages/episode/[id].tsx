// import { useEffect, useState } from 'react';
// import type { NextPage, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';

import styles from 'src/styles/Episode.module.sass';
import { getAllEpisodes, getEpisodeById, getCharacters } from 'src/api/api';
import type { Episode, Character } from 'src/api/types';
import Layout from 'src/components/Layout/Layout';
import Spinner from 'src/components/Spinner/Spinner';
import Card from 'src/components/Card/Card';

const Episode = ({
    episode,
    characters,
}: {
    episode: Episode;
    characters: Character[];
}) => {
    // const router = useRouter();
    // const { id } = router.query;
    // const [isFetching, toggleFetching] = useState(true);
    // const [isSuccess, toggleSuccess] = useState(true);
    // const [episode, setEpisode] = useState({} as Episode);
    // const [characters, setCharacters] = useState([] as Character[]);

    // useEffect(() => {
    //     if (typeof id === 'string') {
    //         getEpisodeById(id)
    //             .then((ep) => {
    //                 setEpisode(ep);
    //                 return ep.characters;
    //             })
    //             .then(getCharacters)
    //             .then(setCharacters)
    //             .catch(() => toggleSuccess(false))
    //             .finally(() => toggleFetching(false));
    //     }

    //     return () => {};
    // }, [id]);

    return (
        <Layout>
            <main className={styles.Main}>
                <h1 className={styles.Title}>
                    {episode.title} #{episode.episode}
                </h1>
                <h2 className={styles.SubTitle}>Some details</h2>
                <p className={styles.Details}>
                    season: {episode.season}
                    {'\n'}
                    date: {episode.air_date}
                </p>
                <h2 className={styles.SubTitle}>Characters</h2>
                <div className={styles.CharactersContainer}>
                    {characters.map((char) => (
                        <Card
                            key={char.char_id}
                            photo={char.img}
                            title={char.name}
                        >
                            <p className={styles.CharactersDescription}>
                                <span className={styles.CharactersName}>
                                    {char.name}
                                    {'\n'}
                                </span>
                                {char.status}
                                {'\n'}
                                <span className={styles.CharactersAnother}>
                                    birthday:{' '}
                                    <span className={styles.CharactersInfo}>
                                        {char.birthday}
                                        {'\n'}
                                    </span>
                                    nickname:{' '}
                                    <span className={styles.CharactersInfo}>
                                        {char.nickname}
                                        {'\n'}
                                    </span>
                                    real name:{' '}
                                    <span className={styles.CharactersInfo}>
                                        {char.portrayed}
                                    </span>
                                </span>
                            </p>
                        </Card>
                    ))}
                </div>
            </main>
        </Layout>
    );
};

export const getStaticPaths = async () => {
    const episodes = await getAllEpisodes();
    const paths = episodes
        .flat()
        .map((ep) => ({ params: { id: String(ep.episode_id) } }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({
    params,
}: {
    params: { id: string };
}) => {
    const episode = await getEpisodeById(params.id);
    const characters = await getCharacters(episode.characters);

    return {
        props: {
            episode,
            characters,
        },
    };
};

export default Episode;
