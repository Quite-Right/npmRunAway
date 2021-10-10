import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

interface ISmallButonProptypes {
  imageSorce?: any;
  text?: string;
  onPress?: () => void;
  style?: Record<string, any>;
  backgroundColor?: string | number;
}

const SmallButton = ({
  imageSorce,
  text,
  style,
  onPress,
  backgroundColor,
}: ISmallButonProptypes) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.roundButton, {backgroundColor}, style]}>
      {text && <Text>{text}</Text>}
      {imageSorce && <Image style={styles.image} source={imageSorce} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default SmallButton;
