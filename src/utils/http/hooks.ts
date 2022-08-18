import { useEffect, useMemo, useState } from 'react';
import { QueryFunction, useInfiniteQuery, useQuery } from 'react-query';
import { httpClient } from './httpClient';
import {
  Character,
  CharacterListDetails,
  CharacterResponse,
  CharactersResponse,
} from './types';

export const CHARACTERS_KEY = 'characters';

export const useGetCharacters = () => {
  const [data, setData] = useState<CharacterListDetails[]>([]);

  const fetcher: QueryFunction<CharactersResponse> = async ({
    pageParam = 0,
  }) => {
    const query = `{
      characters(page: ${pageParam}) {
        info {
          count,
          pages,
          next
        }
        results {
          name,
          id,
          status,
          image
        }
      }
    }`;
    return httpClient
      .post<CharactersResponse>('', { query })
      .then(res => res.data);
  };

  const queryResult = useInfiniteQuery<CharactersResponse>(
    CHARACTERS_KEY,
    fetcher,
    {
      getNextPageParam: lastPage => lastPage.data.characters.info.next,
    },
  );

  useEffect(() => {
    setData(
      queryResult.data?.pages.reduce<CharacterListDetails[]>(
        (prev, current) => {
          return [...prev, ...current.data.characters.results];
        },
        [],
      ) || [],
    );
  }, [queryResult.data?.pages]);

  return {
    ...queryResult,
    data,
    dataTotale: queryResult.data?.pages[0].data.characters,
  };
};

export const useGetCharacter = (characterId: number) => {
  const query = `{
    character(id: ${characterId}) {
      name,
      status,
      species,
      type,
      gender,
      origin {
        id,
        name,
      },
      location {
        id,
        name,
      }
      image,
      episode {
        name,
      },
      created,
    }
  }`;
  const fetcher = () => httpClient.post('', { query }).then(res => res.data);

  const queryResult = useQuery<CharacterResponse>(
    ['character', characterId],
    fetcher,
  );

  return { ...queryResult, data: queryResult.data?.data.character };
};
