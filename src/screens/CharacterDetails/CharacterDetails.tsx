import React, { FC } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/types';
import { useGetCharacter } from 'utils/http/hooks';

const CharacterDetails: FC = () => {
  const {
    params: { characterID },
  } = useRoute<RouteProp<RootStackParamList, 'CharacterDetails'>>();

  const { data, isFetching } = useGetCharacter(characterID);

  if (isFetching) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const {
    name,
    gender,
    image,
    location,
    origin,
    species,
    status,
    type,
    episode,
  } = data!;

  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={{ uri: image }} style={{ width: 124, height: 124 }} />
        <Text>{name}</Text>
        <Text>{gender}</Text>
        <Text>{species}</Text>
        <Text>{status}</Text>
        <Text>{type}</Text>
        <Text>Current location: {location.name}</Text>
        <Text>Origin: {origin.name}</Text>
        <Text>Number of episodes: {episode.length}</Text>
        <Text>First appearance: {episode[0].name}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CharacterDetails;
