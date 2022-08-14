import { useQuery } from 'react-query';
import { httpClient } from './httpClient';

export const CHARACTERS_KEY = 'characters';

export const useGetCharacters = () => {
  const query = `{
        characters {
            info {
                count
            }
            results {
                name
            }
        }
    }`;

  const fetcher = async () =>
    httpClient.post('', { query }).then(res => res.data);

  const queryResult = useQuery(CHARACTERS_KEY, fetcher);

  return queryResult;
};
