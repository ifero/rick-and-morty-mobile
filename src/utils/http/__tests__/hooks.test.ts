import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { QueryClientWrapper } from 'utils/testing/helper';
import { useGetCharacter, useGetCharacters } from '../hooks';
import { httpClient } from '../httpClient';
import { CharactersResponse } from '../types';

const mockedCharacterResponse = {
  data: {
    character: {
      name: 'Summer Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Female',
      origin: { id: '20', name: 'Earth (Replacement Dimension)' },
      location: { id: '20', name: 'Earth (Replacement Dimension)' },
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      episode: [
        { name: 'Rick Potion #9' },
        { name: 'Raising Gazorpazorp' },
        { name: 'Rixty Minutes' },
        { name: 'Something Ricked This Way Comes' },
        { name: 'Close Rick-counters of the Rick Kind' },
        { name: 'Ricksy Business' },
        { name: 'A Rickle in Time' },
        { name: 'Auto Erotic Assimilation' },
        { name: 'Total Rickall' },
        { name: 'Get Schwifty' },
        { name: 'The Ricks Must Be Crazy' },
        { name: 'Big Trouble in Little Sanchez' },
        { name: 'Interdimensional Cable 2: Tempting Fate' },
        { name: "Look Who's Purging Now" },
        { name: 'The Wedding Squanchers' },
        { name: 'The Rickshank Rickdemption' },
        { name: 'Rickmancing the Stone' },
        { name: 'Pickle Rick' },
        { name: 'Vindicators 3: The Return of Worldender' },
        { name: 'The Whirly Dirly Conspiracy' },
        { name: 'Rest and Ricklaxation' },
        { name: "Morty's Mind Blowers" },
        { name: "The ABC's of Beth" },
        { name: 'The Rickchurian Mortydate' },
        { name: 'Edge of Tomorty: Rick, Die, Rickpeat' },
        { name: 'The Old Man and the Seat' },
        { name: "One Crew Over the Crewcoo's Morty" },
        { name: "Claw and Hoarder: Special Ricktim's Morty" },
        { name: 'Rattlestar Ricklactica' },
        { name: 'Promortyus' },
        { name: 'The Vat of Acid Episode' },
        { name: 'Childrick of Mort' },
        { name: 'Star Mort: Rickturn of the Jerri' },
        { name: 'Mort Dinner Rick Andre' },
        { name: 'Mortyplicity' },
        { name: 'A Rickconvenient Mort' },
        { name: 'Rickdependence Spray' },
        { name: 'Amortycan Grickfitti' },
        { name: "Rick & Morty's Thanksploitation Spectacular" },
        { name: 'Gotron Jerrysis Rickvangelion' },
        { name: 'Rickternal Friendshine of the Spotless Mort' },
        { name: 'Rickmurai Jack' },
      ],
      created: '2017-11-04T19:09:56.428Z',
    },
  },
};

const mockedCharactersResponse: CharactersResponse = {
  data: {
    characters: {
      info: { count: 22, next: 2, pages: 2 },
      results: [
        {
          id: 1,
          image: 'https://some.url',
          name: 'Test',
          status: 'Alive',
        },
        {
          id: 2,
          image: 'https://some.url',
          name: 'Test 2',
          status: 'Alive',
        },
        {
          id: 3,
          image: 'https://some.url',
          name: 'Test 3',
          status: 'Alive',
        },
        {
          id: 4,
          image: 'https://some.url',
          name: 'Test 4',
          status: 'Alive',
        },
        {
          id: 5,
          image: 'https://some.url',
          name: 'Test 5',
          status: 'Alive',
        },
      ],
    },
  },
};

describe('Given a set of http hooks', () => {
  describe('useGetCharacter', () => {
    let adapter: MockAdapter;
    beforeEach(() => {
      adapter = new MockAdapter(httpClient);
      adapter.onPost().reply(200, mockedCharacterResponse);
    });

    afterEach(() => {
      adapter.reset();
    });

    it('should return the correct response', async () => {
      const { result, waitFor } = renderHook(() => useGetCharacter(42), {
        wrapper: QueryClientWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(
          mockedCharacterResponse.data.character,
        );
      });
    });
  });

  describe('useGetCharacters', () => {
    let adapter: MockAdapter;
    beforeEach(() => {
      adapter = new MockAdapter(httpClient);
      adapter.onPost().reply(200, mockedCharactersResponse);
    });

    afterEach(() => {
      adapter.reset();
    });

    it('should return the correct response', async () => {
      const { result, waitFor } = renderHook(useGetCharacters, {
        wrapper: QueryClientWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(5);
      });
    });
  });
});
