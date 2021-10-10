import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {IPlayer} from '../game/game';
import Player from '../player/player';

interface Props {
  id?: number;
  cardName?: string;
  cardImage: ImageSourcePropType;
  rotationAngle?: number;
  playersOnCard?: IPlayer[];
}

const CornerField = ({cardImage, rotationAngle, playersOnCard}: Props) => {
  const angle = rotationAngle + 'deg';
  return (
    <View style={styles.cornerField}>
      <View
        style={[
          styles.cornerWrapper,
          {
            transform: [
              {
                rotate: angle,
              },
            ],
          },
        ]}>
        <Image style={[styles.cornerImage]} source={cardImage} />
        {playersOnCard && (
          <View style={[styles.players]}>
            <View style={styles.playersInnerContainer}>
              {playersOnCard.map(player => (
                <Player key={player.id} imageSorce={player.playerIcon} />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cornerField: {
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
    position: 'relative',
  },
  cornerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerImage: {
    width: 140,
    height: 140,
  },
  players: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default CornerField;
