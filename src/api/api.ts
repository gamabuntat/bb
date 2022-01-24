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

export const getCharacters = (characters: string[]) =>
  Promise.all(
    characters.map((char) =>
      fetch(`${url}characters?name=${char.replace(/\s/g, '+')}`)
    )
  )
    .then((r) => Promise.all(r.map((response) => response.json())))
    .then((r) => console.log(r[0][0]));
