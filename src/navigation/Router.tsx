import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from 'screens/Landing';

const { Navigator, Screen } = createNativeStackNavigator();

const Router: FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="ScreenName" component={Landing} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
