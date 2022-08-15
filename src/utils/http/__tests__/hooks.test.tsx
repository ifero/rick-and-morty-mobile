import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useGetCharacters } from '../hooks';
import { httpClient, queryClient } from '../httpClient';

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('given a set of API hooks', () => {
  describe('given a useGetCharacters hook', () => {
    let adapter: MockAdapter;

    beforeEach(() => {
      adapter = new MockAdapter(httpClient);

      adapter.onPost().reply(200, {
        data: {
          characters: {
            info: { count: 826, pages: 42, next: 2 },
            results: [
              {
                name: 'Rick Sanchez',
                id: '1',
                status: 'Alive',
                image: 'https://image.com',
              },
              { name: 'Morty Smith', id: '2', status: 'Alive' },
              {
                name: 'Summer Smith',
                id: '3',
                status: 'Alive',
                image: 'https://image.com',
              },
              { name: 'Beth Smith', id: '4', status: 'Alive' },
              {
                name: 'Jerry Smith',
                id: '5',
                status: 'Alive',
                image: 'https://image.com',
              },
              {
                name: 'Abadango Cluster Princess',
                id: '6',
                status: 'Alive',
                image: 'https://image.com',
              },
              {
                name: 'Abradolf Lincler',
                id: '7',
                status: 'unknown',
                image: 'https://image.com',
              },
              {
                name: 'Adjudicator Rick',
                id: '8',
                status: 'Dead',
                image: 'https://image.com',
              },
              { name: 'Agency Director', id: '9', status: 'Dead' },
              {
                name: 'Alan Rails',
                id: '10',
                status: 'Dead',
                image: 'https://image.com',
              },
              { name: 'Albert Einstein', id: '11', status: 'Dead' },
              {
                name: 'Alexander',
                id: '12',
                status: 'Dead',
                image: 'https://image.com',
              },
              {
                name: 'Alien Googah',
                id: '13',
                status: 'unknown',
                image: 'https://image.com',
              },
              {
                name: 'Alien Morty',
                id: '14',
                status: 'unknown',
                image: 'https://image.com',
              },
              { name: 'Alien Rick', id: '15', status: 'unknown' },
              {
                name: 'Amish Cyborg',
                id: '16',
                status: 'Dead',
                image: 'https://image.com',
              },
              {
                name: 'Annie',
                id: '17',
                status: 'Alive',
                image: 'https://image.com',
              },
              {
                name: 'Antenna Morty',
                id: '18',
                status: 'Alive',
                image: 'https://image.com',
              },
              {
                name: 'Antenna Rick',
                id: '19',
                status: 'unknown',
                image: 'https://image.com',
              },
              {
                name: 'Ants in my Eyes Johnson',
                id: '20',
                status: 'unknown',
                image: 'https://image.com',
              },
            ],
          },
        },
      });
    });

    afterEach(() => {
      adapter.reset();
    });

    it('should return the first 20 characters', async () => {
      const { result, waitFor } = renderHook(useGetCharacters, {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.data?.results).toHaveLength(20);
      });
    });
  });
});
