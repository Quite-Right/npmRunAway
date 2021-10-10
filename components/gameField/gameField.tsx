import React from 'react';
import {StyleSheet, View} from 'react-native';
import ZoomableView from '../zoomableView/zoomableView';
import Dice from '../dice/dice';
import RegularCard from '../regularCard/regularCard';
import CornerField from '../cornerField/cornerField';
import { APP, cornerFields, fields, VTBlighter, VTBlightest } from "../../constants";
import {IGameState} from '../game/game';
import AppMetrica from 'react-native-appmetrica';

interface IGameFieldProps {
  onRoll: (dices: [number, number]) => void;
  gameState: IGameState;
  addCardModal: (param: any) => void;
  modalClose: () => void;
  hasDiced: boolean;
}

const GameField = ({
  onRoll,
  gameState,
  addCardModal,
  modalClose,
  hasDiced,
}: IGameFieldProps) => {
  return (
    <ZoomableView>
      <View style={[styles.row, styles.gameField]}>
        <View>
          <CornerField
            {...cornerFields.find(field => field.id === 20)}
            playersOnCard={gameState.players.filter(
              player => player.position === 20,
            )}
          />
          {fields
            .filter(field => field.rotationType === 'right')
            .sort((a, b) => b.id - a.id)
            .map(field => (
              <RegularCard
                {...field}
                key={field.id}
                playersOnCard={gameState.players.filter(
                  player => player.position === field.id,
                )}
                onPress={() => {
                  AppMetrica.reportEvent('CARD_MODAL_SHOW', field);
                  addCardModal({
                    id: field.id,
                    onClose: modalClose,
                    text: `Посмотреть информацию о данном активе и не только вы можете в приложении ВТБ Инвестиции ${APP}`,
                  });
                }}
              />
            ))}
          <CornerField
            {...cornerFields.find(field => field.id === 10)}
            playersOnCard={gameState.players.filter(
              player => player.position === 10,
            )}
          />
        </View>

        <View>
          <View style={styles.row}>
            {fields
              .filter(field => field.rotationType === 'bottom')
              .map(field => (
                <RegularCard
                  {...field}
                  key={field.id}
                  playersOnCard={gameState.players.filter(
                    player => player.position === field.id,
                  )}
                  onPress={() => {
                    AppMetrica.reportEvent('CARD_MODAL_SHOW', field);
                    addCardModal({
                      id: field.id,
                      onClose: modalClose,
                      text: `Посмотреть информацию о данном активе и не только вы можете в приложении ВТБ Инвестиции ${APP}`,
                    });
                  }}
                />
              ))}
          </View>
          <View style={styles.center}>
            <Dice onDiceChange={onRoll} isActive={!hasDiced} />
          </View>
          <View style={styles.row}>
            {fields
              .filter(field => field.rotationType === undefined)
              .sort((a, b) => b.id - a.id)
              .map(field => (
                <RegularCard
                  {...field}
                  key={field.id}
                  playersOnCard={gameState.players.filter(
                    player => player.position === field.id,
                  )}
                  onPress={() => {
                    AppMetrica.reportEvent('CARD_MODAL_SHOW', field);
                    addCardModal({
                      id: field.id,
                      onClose: modalClose,
                      text: `Посмотреть информацию о данном активе и не только вы можете в приложении ВТБ Инвестиции ${APP}`,
                    });
                  }}
                />
              ))}
          </View>
        </View>

        <View>
          <CornerField
            {...cornerFields.find(field => field.id === 30)}
            playersOnCard={gameState.players.filter(
              player => player.position === 30,
            )}
          />
          {fields
            .filter(field => field.rotationType === 'left')
            .map(field => (
              <RegularCard
                {...field}
                key={field.id}
                playersOnCard={gameState.players.filter(
                  player => player.position === field.id,
                )}
                onPress={() => {
                  AppMetrica.reportEvent('CARD_MODAL_SHOW', field);
                  addCardModal({
                    id: field.id,
                    onClose: modalClose,
                    text: `Посмотреть информацию о данном активе и не только вы можете в приложении ВТБ Инвестиции ${APP}`,
                  });
                }}
              />
            ))}
          <CornerField
            {...cornerFields.find(field => field.id === 0)}
            playersOnCard={gameState.players.filter(
              player => player.position === 0,
            )}
          />
        </View>
      </View>
    </ZoomableView>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: VTBlighter,
    //фон строк
  },
  gameField: {},
  center: {
    width: 900,
    height: 900,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: VTBlightest,
    //фон доски
  },
  regularBorderField: {
    width: 200,
    height: 100,
    backgroundColor: 'blue',
    position: 'relative',
  },
  rotateRight: {
    transform: [
      {
        rotateZ: '90deg',
      },
    ],
    position: 'relative',
    top: -50,
    left: 50,
    width: 100,
    height: 200,
    // delete
    borderWidth: 2,
    borderColor: 'orange',
  },
  rotateLeft: {
    transform: [
      {
        rotateZ: '270deg',
      },
    ],
    position: 'relative',
    top: -50,
    left: 50,
    width: 100,
    height: 200,
    // delete
    borderWidth: 2,
    borderColor: 'orange',
  },
  rotateBottom: {
    transform: [
      {
        rotateZ: '180deg',
      },
    ],
    position: 'relative',
    top: 0,
    left: 0,
    width: 100,
    height: 200,
    // delete
    borderWidth: 2,
    borderColor: 'orange',
  },
});

export default GameField;

// TODO: добавить +, -, ?;
