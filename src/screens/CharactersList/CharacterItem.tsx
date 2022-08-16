import { FC, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  TextStyle,
} from 'react-native';
import { CharacterListDetails, Status } from 'utils/http/types';

type Props = {
  onPress: (id: number) => void;
} & CharacterListDetails;

const setBackgroundColor = (status: Status): StyleProp<TextStyle> => {
  if (status === 'unknown') {
    return { color: 'black' };
  }

  return { color: status === 'Alive' ? 'green' : 'red' };
};

const CharacterItem: FC<Props> = ({ id, image, name, status, onPress }) => {
  const onCharacterPress = useCallback(() => {
    onPress(id);
  }, [onPress, id]);

  return (
    <Pressable
      style={styles.container}
      key={id}
      onPress={onCharacterPress}
      testID="CharacterItem">
      <Image source={{ uri: image }} style={styles.icon} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={[styles.name, setBackgroundColor(status)]}>{status}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
  detailsContainer: {
    marginLeft: 8,
  },
});

export default CharacterItem;
