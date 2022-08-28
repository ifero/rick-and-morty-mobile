import { FC } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { useGetCharacter } from 'utils/http/hooks';

type Props = {
  characterID: number;
};

const CharacterHeader: FC<Props> = ({ characterID }) => {
  const { data, isFetching } = useGetCharacter(characterID);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: data?.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{data?.name}</Text>
        <Text>{data?.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

export default CharacterHeader;
