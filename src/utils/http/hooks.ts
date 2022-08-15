import { useQuery } from 'react-query';
import { httpClient } from './httpClient';
import { CharactersResponse } from './types';

export const CHARACTERS_KEY = 'characters';

export const useGetCharacters = () => {
  const query = `{
    characters(page: 1) {
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

  const fetcher = async () =>
    httpClient.post<CharactersResponse>('', { query }).then(res => res.data);

  const queryResult = useQuery<CharactersResponse>(CHARACTERS_KEY, fetcher);

  return { ...queryResult, data: queryResult.data?.data.characters };
};
