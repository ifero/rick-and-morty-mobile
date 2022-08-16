import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from 'screens/Landing';
import CharactersList from 'screens/CharactersList';
import CharacterDetails from 'screens/CharacterDetails';
import { RootStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const Router: FC = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Landing">
        <Screen
          name="Landing"
          component={Landing}
          options={{ title: 'Rick and Morty' }}
        />
        <Screen
          name="CharactersList"
          component={CharactersList}
          options={{ title: 'List of characters' }}
        />
        <Screen
          name="CharacterDetails"
          component={CharacterDetails}
          options={{ title: '' }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
