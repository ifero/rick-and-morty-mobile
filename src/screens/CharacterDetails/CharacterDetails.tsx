import React, { FC, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RootStackParamList } from 'navigation/types';
import { useGetCharacter } from 'utils/http/hooks';
import DetailSection from 'components/DetailSection';
import { getGenderIcon } from 'utils/icons';

const CharacterDetails: FC = () => {
  const {
    params: { characterID },
  } = useRoute<RouteProp<RootStackParamList, 'CharacterDetails'>>();

  const { data, isFetching } = useGetCharacter(characterID);

  const { setOptions } = useNavigation<NavigationProps>();

  useEffect(() => {
    setOptions({
      title: isFetching ? '' : data?.name,
      headerLargeTitle: true,
    });
  }, [data?.name, setOptions, isFetching]);

  if (isFetching) {
    return (
      <SafeAreaView testID="CharacterDetails-EmptyScreen">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const { gender, image, location, origin, species, status, type, episode } =
    data!;

  return (
    <SafeAreaView testID="CharacterDetails" style={styles.safeArea}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flexGrow: 1 }}
        contentContainerStyle={styles.content}>
        <Image
          resizeMode="cover"
          source={{ uri: image }}
          style={styles.image}
        />
        <DetailSection
          style={styles.section}
          title="Gender"
          value={gender}
          Icon={getGenderIcon(gender, 40)}
        />
        <DetailSection style={styles.section} title="Species" value={species} />
        <DetailSection style={styles.section} title="Status" value={status} />
        {type ? (
          <DetailSection style={styles.section} title="Type" value={type} />
        ) : null}
        <DetailSection
          style={styles.section}
          title="Current location"
          value={location.name}
          id={location.id}
        />
        <DetailSection
          style={styles.section}
          title="Origin"
          value={origin.name}
          id={origin.id}
        />
        <DetailSection
          style={styles.section}
          title="Number of episodes"
          value={episode.length}
        />
        <DetailSection
          style={styles.section}
          title="First appearance"
          value={episode[0].name}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', height: 180, marginBottom: 8 },
  safeArea: { backgroundColor: 'white' },
  content: { paddingHorizontal: 16 },
  section: { marginBottom: 16 },
});

export default CharacterDetails;
