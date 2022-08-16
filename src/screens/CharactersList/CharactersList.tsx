import { FC, useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'navigation/types';
import { useGetCharacters } from 'utils/http/hooks';
import { CharacterListDetails } from 'utils/http/types';
import CharacterItem from './CharacterItem';

const Separator: FC = () => <View style={styles.separator} />;

const CharactersList: FC = () => {
  const { data } = useGetCharacters();

  const { navigate } = useNavigation<NavigationProps>();

  const onCharacterPress = useCallback(
    (id: number) => {
      navigate('CharacterDetails', { characterID: id });
    },
    [navigate],
  );

  const keyExtractor = (item: CharacterListDetails) =>
    `character-${item.name}-${item.id}`;

  const renderItem: ListRenderItem<CharacterListDetails> = ({ item }) => (
    <CharacterItem {...item} onPress={onCharacterPress} />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={data?.results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default CharactersList;
