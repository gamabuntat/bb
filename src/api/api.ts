import type { ResponseEpisode, Episode, Character } from './types';

const url = 'https://www.breakingbadapi.com/api/';

export const getAllEpisodes = () =>
    fetch(`${url}episodes?series=Breaking+Bad`)
        .then((r) => r.json())
        .then((episodes: ResponseEpisode[]) =>
            episodes.map((ep) => ({
                ...ep,
                season: Number(ep.season),
                episode: Number(ep.episode),
            }))
        )
        .then((episodes: Episode[]) =>
            Array.from(new Set(episodes.map((ep) => ep.season)), (season) =>
                episodes
                    .filter((ep) => ep.season === season)
                    .sort((a, b) => a.episode - b.episode)
            )
        );

export const getEpisodeById = (id: string): Promise<Episode> =>
    fetch(`${url}episodes/${id}`)
        .then((r) => r.json())
        .then((ep) => ep[0]);

export const getCharacters = (characters: string[]): Promise<Character[]> =>
    Promise.all(
        characters.map((char) =>
            fetch(`${url}characters?name=${char.replace(/\s/g, '+')}`)
        )
    )
        .then((r) => Promise.all(r.map((response) => response.json())))
        .then((chars) => chars.map((char) => char[0]))
        .then((chars) => chars.filter((char) => char));
