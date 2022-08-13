import { FC } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Landing: FC = () => {
  return (
    <SafeAreaView>
      <Text>Welcome to Rick and Morty</Text>
    </SafeAreaView>
  );
};

export default Landing;
