import { useMemo } from 'react';
import { QueryFunction, useInfiniteQuery, useQuery } from 'react-query';
import { httpClient } from './httpClient';
import {
  CharacterListDetails,
  CharacterResponse,
  CharactersResponse,
} from './types';

export const CHARACTERS_KEY = 'characters';

export const useGetCharacters = () => {
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

  const data = useMemo(
    () =>
      queryResult.data?.pages.reduce<CharacterListDetails[]>(
        (prev, current) => {
          return [...prev, ...current.data.characters.results];
        },
        [],
      ) || [],
    [queryResult.data?.pages],
  );

  return {
    ...queryResult,
    data,
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
        id,
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
