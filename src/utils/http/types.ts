type Info = {
  count: number;
  pages: number;
  next?: number;
  prev?: number;
};

export type Status = 'Alive' | 'Dead' | 'unknown';

export type Gender = 'Male' | 'Female' | 'Genderless' | 'unknown';

export type Origin = {};

export type Location = {};

export type Character = {
  name: string;
  id: number;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterListDetails = Pick<
  Character,
  'name' | 'id' | 'status' | 'image'
>;

export type Characters = {
  info: Pick<Info, 'count' | 'pages' | 'next'>;
  results: CharacterListDetails[];
};

export type CharactersResponse = {
  data: {
    characters: Characters;
  };
};
