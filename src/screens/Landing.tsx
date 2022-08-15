import { FC, useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from 'navigation/types';

const Landing: FC = () => {
  const { navigate } = useNavigation<NavigationProps>();

  const goToList = useCallback(() => {
    navigate('CharactersList');
  }, [navigate]);

  return (
    <SafeAreaView>
      <Text>Welcome to Rick and Morty</Text>
      <Pressable onPress={goToList}>
        <Text>GO TO LIST!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Landing;
