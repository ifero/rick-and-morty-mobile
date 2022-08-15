import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing: undefined;
  CharactersList: undefined;
  CharacterDetails: { characterID: number };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
