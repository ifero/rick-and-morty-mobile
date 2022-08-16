import { fireEvent } from '@testing-library/react-native';
import * as httpHooks from 'utils/http/hooks';
import { renderWithHttpClient } from 'utils/testing/helper';
import CharactersList from '../CharactersList';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const returnedCharacters = [
  {
    name: 'Rick Sanchez',
    id: 1,
    status: 'Alive',
    image: 'https://image.com',
  },
  {
    name: 'Morty Smith',
    id: 2,
    status: 'Alive',
    image: 'https://image.com',
  },
  {
    name: 'Summer Smith',
    id: 3,
    status: 'Alive',
    image: 'https://image.com',
  },
  {
    name: 'Beth Smith',
    id: 4,
    status: 'Alive',
    image: 'https://image.com',
  },
  {
    name: 'Jerry Smith',
    id: 5,
    status: 'Alive',
    image: 'https://image.com',
  },
  {
    name: 'Abadango Cluster Princess',
    id: 6,
    status: 'Alive',
    image: 'https://image.com',
  },
  {
    name: 'Abradolf Lincler',
    id: 7,
    status: 'unknown',
    image: 'https://image.com',
  },
  {
    name: 'Adjudicator Rick',
    id: 8,
    status: 'Dead',
    image: 'https://image.com',
  },
  {
    name: 'Agency Director',
    id: 9,
    status: 'Dead',
    image: 'https://image.com',
  },
  {
    name: 'Alan Rails',
    id: 10,
    status: 'Dead',
    image: 'https://image.com',
  },
];

jest.spyOn(httpHooks, 'useGetCharacters').mockReturnValue({
  data: {
    info: { count: 826, pages: 42, next: 2 },
    results: returnedCharacters,
  },
} as any);

describe('Given a CharactersList component', () => {
  describe('when the api call fetches successfully', () => {
    it('should render all the elements', async () => {
      const { findAllByTestId } = renderWithHttpClient(<CharactersList />);

      const elmenents = await findAllByTestId('CharacterItem');
      expect(elmenents).toHaveLength(returnedCharacters.length);
    });

    it('should navigate to the correct screen when element is pressed', () => {
      const { getByText } = renderWithHttpClient(<CharactersList />);

      fireEvent.press(getByText('Rick Sanchez'));

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('CharacterDetails', {
        characterID: 1,
      });
    });
  });
});
