import { render } from '@testing-library/react-native';
import { getGenderIcon } from 'utils/icons';

describe('given a set of icons helper', () => {
  describe('on getGenderIcon', () => {
    describe('when the gender is male', () => {
      it('should return the correct element', () => {
        const { getByTestId } = render(getGenderIcon('Male'));

        expect(getByTestId('Male')).toBeDefined();
      });
    });

    describe('when the gender is female', () => {
      it('should return the correct element', () => {
        const { getByTestId } = render(getGenderIcon('Female'));

        expect(getByTestId('Female')).toBeDefined();
      });
    });

    describe('when the gender is genderless', () => {
      it('should return the correct element', () => {
        const { getByTestId } = render(getGenderIcon('Genderless'));

        expect(getByTestId('GenderLess')).toBeDefined();
      });
    });

    describe('when the gender is unknown', () => {
      it('should return the correct element', () => {
        const { getByTestId } = render(getGenderIcon('unknown'));

        expect(getByTestId('Unknown')).toBeDefined();
      });
    });
  });
});
