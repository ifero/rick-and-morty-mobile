import React, { FC, ReactElement, useCallback } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  title: string;
  value: string | number;
  id?: string | number;
  Icon?: ReactElement;
  style?: StyleProp<ViewStyle>;
  onPress?: (id?: string | number) => void;
};

const DetailSection: FC<Props> = ({
  title,
  value,
  Icon,
  id,
  onPress,
  style,
}) => {
  const onSectionPress = useCallback(() => {
    onPress && onPress(id);
  }, [id, onPress]);

  return (
    <Pressable
      style={[styles.container, style]}
      disabled={!onPress}
      onPress={onSectionPress}>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {Icon ? Icon : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
  },
  detailContainer: {
    flex: 1,
  },
  value: {
    fontSize: 32,
  },
});

export default DetailSection;
