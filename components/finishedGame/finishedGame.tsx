import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {ICard, IPlayer} from '../game/game';
import { APP, fields, INVESTMENT_SCHOOL, TG_CHANNEL, VTBblue } from "../../constants";
import ModalCustom from '../modalCustom/modalCustom';
import Hyperlink from 'react-native-hyperlink';

interface IFinishedGame {
  onClose: () => void;
  players: IPlayer[];
  cards: ICard[];
}

const FinishedGame = ({onClose, players, cards}: IFinishedGame) => {
  return (
    <View style={styles.finishedGameContainer}>
      {players.map(({id, balance}) => (
        <View key={id} style={styles.playerContainer}>
          <View style={styles.player}>
            <Text style={styles.playerId}>{id}</Text>
            <Text style={styles.playerBalance}>{balance} W</Text>
          </View>
          <Text style={styles.playerActionsDescription}>
            {`За время игры игрок вложился в: ${cards
              .filter(card => card.cardOwnerId === id)
              .map(card => fields.find(field => field.id === card.id))
              .map(card => card && card.cardName)
              .join(', ')}.`}
          </Text>
        </View>
      ))}
      <Hyperlink linkDefault={true} linkStyle={{color: VTBblue}}>
        <Text style={styles.textContainer}>
          {`Посмотреть информацию о данных активах и не только вы можете в приложении ВТБ Инвестиции ${APP}`}
        </Text>
      </Hyperlink>
      <Hyperlink linkDefault={true} linkStyle={{color: VTBblue}}>
        <Text style={styles.textContainer}>
          {`А если вы хотите стать профессиональным инвестором, то вам стоит рассмотреть нашу школу ${INVESTMENT_SCHOOL}`}
        </Text>
      </Hyperlink>
      <Hyperlink linkDefault={true} linkStyle={{color: VTBblue}}>
        <Text style={styles.textContainer}>
          {`А чтобы минимизировать риск того, что вы пропустите важную информацию, подписывайтесь на наш телеграмм канал ${TG_CHANNEL}`}
        </Text>
      </Hyperlink>

      <Button title={'Ок'} onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    display: 'flex',
    flexDirection: 'row',
  },
  finishedGameContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 8,
    height: '100%',
  },
  playerContainer: {width: '100%', marginBottom: 10},
  playerId: {
    fontWeight: '600',
    fontSize: 20,
    marginRight: 'auto',
  },
  playerBalance: {
    fontWeight: '600',
    fontSize: 20,
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  playerActionsDescription: {
    fontSize: 16,
  },
});

export default FinishedGame;
