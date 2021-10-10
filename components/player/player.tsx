import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

interface IPlayerProptypes {
  imageSorce?: any;
  onPress?: () => void;
  style?: Record<string, any>;
}

const Player = ({imageSorce, style, onPress}: IPlayerProptypes) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.playerChip, style]}>
      {imageSorce && <Image style={styles.playerIcon} source={imageSorce} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playerChip: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    margin: 2,
  },
  playerIcon: {
    width: 40,
    height: 40,
  },
});

export default Player;
