import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {IPlayer} from '../game/game';

interface IInfo {
  onClose: () => void;
  players: IPlayer[];
}

const Info = ({onClose, players}: IInfo) => {
  return (
    <View style={styles.infoContainer}>
      {players.map(({id, balance}) => (
        <View key={id} style={styles.player}>
          <Text style={styles.playerId}>{id}</Text>
          <Text style={styles.playerBalance}>{balance} W</Text>
        </View>
      ))}
      <Button title={'Ок'} onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  player: {
    display: 'flex',
    flexDirection: 'row',
  },
  playerId: {
    fontWeight: '600',
    width: '70%',
    marginRight: 4,
  },
  playerBalance: {
    fontWeight: '600',
  },
});

export default Info;
