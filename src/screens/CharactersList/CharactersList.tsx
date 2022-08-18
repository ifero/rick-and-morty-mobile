import { FC, useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'navigation/types';
import { useGetCharacters } from 'utils/http/hooks';
import { CharacterListDetails } from 'utils/http/types';
import CharacterItem from './CharacterItem';

const Separator: FC = () => <View style={styles.separator} />;

const BottomLoader: FC = () => <ActivityIndicator size="large" />;

const CharactersList: FC = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetCharacters();

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

  const onEndReached = useCallback(() => {
    hasNextPage && !isFetchingNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <SafeAreaView>
      <FlatList
        testID="CharactersList"
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={isFetchingNextPage ? BottomLoader : undefined}
        onEndReached={onEndReached}
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
