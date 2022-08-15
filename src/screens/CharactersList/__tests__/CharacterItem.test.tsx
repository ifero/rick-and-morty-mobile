import { renderWithHttpClient } from 'utils/testing/helper';
import CharacterItem from '../CharacterItem';

describe('Given a CharacterItem element', () => {
  describe('given the character status as Alive', () => {
    it('should have the correct status text color', () => {
      const { getByText } = renderWithHttpClient(
        <CharacterItem
          id={1}
          image="https://some.url"
          name="Test name"
          onPress={jest.fn}
          status="Alive"
        />,
      );

      expect(getByText('Alive')).toHaveStyle({ color: 'green' });
    });
  });

  describe('given the character status as Dead', () => {
    it('should have the correct status text color', () => {
      const { getByText } = renderWithHttpClient(
        <CharacterItem
          id={1}
          image="https://some.url"
          name="Test name"
          onPress={jest.fn}
          status="Dead"
        />,
      );

      expect(getByText('Dead')).toHaveStyle({ color: 'red' });
    });
  });

  describe('given the character status as unknown', () => {
    it('should have the correct status text color', () => {
      const { getByText } = renderWithHttpClient(
        <CharacterItem
          id={1}
          image="https://some.url"
          name="Test name"
          onPress={jest.fn}
          status="unknown"
        />,
      );

      expect(getByText('unknown')).toHaveStyle({ color: 'black' });
    });
  });
});
