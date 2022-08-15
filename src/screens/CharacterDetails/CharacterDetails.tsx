import { FC } from 'react';
import { ScrollView, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from 'navigation/types';

const CharacterDetails: FC = () => {
  const {
    params: { characterID },
  } = useRoute<RouteProp<RootStackParamList, 'CharacterDetails'>>();

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{characterID}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CharacterDetails;
