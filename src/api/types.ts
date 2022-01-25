type NumberMap<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? number : T[P];
};

export type ResponseEpisode = {
  episode_id: number;
  title: string;
  season: string;
  episode: string;
  air_date: string;
  characters: string[];
  series: string;
};

export type Episode = NumberMap<ResponseEpisode, 'season' | 'episode'>;

export type Character = {
  char_id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  nickname: string;
  appearance: number[];
  portrayed: string;
  category: number[];
};
