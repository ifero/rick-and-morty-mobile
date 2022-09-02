import React, { ReactElement } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import { Gender } from './http/types';

const absolutePositionTop: StyleProp<ViewStyle> = {
  position: 'absolute',
  top: 0,
};
const absolutePositionBottom: StyleProp<ViewStyle> = {
  position: 'absolute',
  bottom: 0,
};

export const getGenderIcon = (
  gender: Gender,
  size: number = 24,
): ReactElement => {
  switch (gender) {
    case 'Female':
      return (
        <Icon size={size} name="female-symbol" color="pink" testID="Female" />
      );
    case 'Male':
      return <Icon size={size} name="male-symbol" color="blue" testID="Male" />;
    case 'Genderless':
      return (
        <View testID="GenderLess">
          <Icon
            size={size}
            name="male-symbol"
            color="black"
            style={absolutePositionBottom}
          />
          <Icon
            size={size}
            name="female-symbol"
            color="black"
            style={absolutePositionTop}
          />
        </View>
      );
    default:
      return (
        <Text testID="Unknown" style={{ fontSize: size }}>
          ?
        </Text>
      );
  }
};
