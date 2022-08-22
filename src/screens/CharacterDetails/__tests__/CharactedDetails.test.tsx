import { screen } from '@testing-library/react-native';
import * as hooks from 'utils/http/hooks';
import { renderWithHttpClient } from 'utils/testing/helper';
import CharacterDetails from '../CharacterDetails';

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: { characterID: 42 },
  }),
}));

const mockCharacterResponse = (isFetching: boolean) =>
  jest.spyOn(hooks, 'useGetCharacter').mockReturnValue({
    data: {
      name: 'Test name',
      episode: [{ name: 'Episode Name 1' }, { name: 'Episode Name 2' }],
      id: 1,
      gender: 'Female',
      image: 'http://some.url',
      species: 'Some species',
      status: 'Alive',
      origin: { name: 'Mars' },
      location: { name: 'Somewhere' },
    },
    isFetching,
  } as any);

describe('Given a CharacterDetails component', () => {
  describe('when the API is fetching the data', () => {
    beforeEach(() => {
      mockCharacterResponse(true);
    });

    it('should show the loader content', () => {
      const { getByTestId } = renderWithHttpClient(<CharacterDetails />);

      expect(getByTestId('CharacterDetails-EmptyScreen')).toBeDefined();
    });
  });

  describe('when the API fetched the data', () => {
    beforeEach(() => {
      mockCharacterResponse(false);

      renderWithHttpClient(<CharacterDetails />);
    });

    it('should show the correct content', () => {
      const { getByTestId } = screen;

      expect(getByTestId('CharacterDetails')).toBeDefined();
    });

    it('should show the correct data', () => {
      const { getByText } = screen;

      expect(getByText('Test name')).toBeDefined();
      expect(getByText('Female')).toBeDefined();
      expect(getByText('Some species')).toBeDefined();
      expect(getByText('Number of episodes: 2')).toBeDefined();
      expect(getByText('First appearance: Episode Name 1')).toBeDefined();
    });
  });
});
