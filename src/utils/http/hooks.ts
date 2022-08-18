import { useEffect, useMemo, useState } from 'react';
import { QueryFunction, useInfiniteQuery } from 'react-query';
import { httpClient } from './httpClient';
import { CharacterListDetails, CharactersResponse } from './types';

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
