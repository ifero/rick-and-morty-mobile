type Info = {
  count: number;
  pages: number;
  next?: number;
  prev?: number;
};

export type Status = 'Alive' | 'Dead' | 'unknown';

export type Gender = 'Male' | 'Female' | 'Genderless' | 'unknown';

export type Location = {
  id: number;
  name: string;
  type: string;
  dimentions: string;
  residents: Character[];
  url: string;
  created: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  url: string;
  created: string;
};

export type Character = {
  name: string;
  id: number;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
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

export type CharacterResponse = {
  data: {
    character: Character;
  };
};
