import React, {Component, ReactNode} from 'react';
import {View, Text, Button, ImageSourcePropType} from 'react-native';
import GameField from '../gameField/gameField';
import {getRandomInt} from '../../utils';
import FixedButtonGroup from '../fixedButtonGroup/fixedButtonGroup';
import SmallButton from '../smallButton/smallButton';
import AlertModal, {IAlertModalProptypes} from '../alertModal/alertModal';
import {
  APP,
  INVESTMENT_SCHOOL,
  KREDIT,
  TG_CHANNEL,
} from '../../constants/links';
import CardModal from '../cardModal/cardModal';
import AppMetrica from 'react-native-appmetrica';
import {initialGameState} from '../../constants/states';
import {settingsIcon} from '../../constants/menuIcons';
import Info from '../info/info';
import FinishedGame from '../finishedGame/finishedGame';
import ModalCustom from '../modalCustom/modalCustom';

export interface IPlayer {
  id: string;
  balance: number;
  index: number;
  active: boolean;
  position: number;
  playerIcon: ImageSourcePropType;
}

export interface ICard {
  readonly id: number;
  cardOwnerId?: string;
  playersIdsOnCard: string[];
  readonly price?: number;
}

interface IMoveState {
  playerId?: string;
  hasDiced: boolean;
  dices: [number, number];
  moveNumber: number;
}

export interface IGameState {
  gameStage: 'start' | 'process' | 'finished';
  players: IPlayer[];
  moveState: IMoveState;
  cards: ICard[];
  modalsState: ReactNode[];
}

class Game extends Component<any, IGameState> {
  constructor(props: any) {
    super(props);
    this.onRoll = this.onRoll.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addCardModal = this.addCardModal.bind(this);
    this.addModal = this.addModal.bind(this);
    this.state = initialGameState;
  }

  endTurn() {
    const currentPlayer = this.state.players.find(
      (player: IPlayer) => player.id === this.state.moveState.playerId,
    );
    const playersAmount = this.state.players.length;

    if (currentPlayer) {
      this.setState(
        {
          moveState: {
            ...this.state.moveState,
            hasDiced: false,
            playerId:
              currentPlayer.index === playersAmount - 1
                ? this.state.players[0].id
                : this.state.players[currentPlayer.index + 1].id,
          },
        },
        () => {
          if (
            this.state.moveState.moveNumber >
            this.state.players.length * 3 + 1
          ) {
            this.setState({
              gameStage: 'finished',
              moveState: {
                ...this.state.moveState,
                hasDiced: true,
              },
              modalsState: [],
            });
          } else {
            const currentPlayer = this.state.players.find(
              (player: IPlayer) => player.id === this.state.moveState.playerId,
            );
            this.addAlert({text: `Ход ${currentPlayer?.id}`});
          }
        },
      );
    }
  }

  addModal(element: JSX.Element) {
    this.setState((state: any) => ({
      modalsState: [...state.modalsState, element],
    }));
  }

  addCardModal({text, id, children, onClose}: any) {
    this.addModal(
      <CardModal id={id} text={text} onClose={onClose}>
        {children}
      </CardModal>,
    );
  }

  addAlert({
    text,
    buttonText,
    onPress,
  }: Omit<IAlertModalProptypes, 'onPress'> & {onPress?: () => void}) {
    this.addModal(
      <AlertModal
        text={text}
        buttonText={buttonText}
        onPress={() => {
          if (onPress) {
            onPress();
          }
          this.closeModal();
        }}
      />,
    );
  }

  closeModal() {
    this.setState(state => {
      const newState = state.modalsState.map((modalState: any) => ({
        ...modalState,
      }));
      newState.shift();
      return {
        modalsState: newState,
      };
    });
  }

  changeEndTurnState(newPlayersState: IPlayer[], newCardsState: ICard[]) {
    this.setState(state => ({
      players: newPlayersState ? [...newPlayersState] : state.players,
      cards: newCardsState ? [...newCardsState] : state.cards,
    }));
  }

  playerLoses(
    currentPlayer: IPlayer,
    newPlayersState: IPlayer[],
    newCardsState: ICard[],
  ) {
    this.addAlert({
      text: `Вы проиграли, ваш баланс ушел в минус, так бывает, когда пытаешься купить что-то дорогое в краткосрочной перспективе, чтобы избежать подобных ситуаций можно воспользоваться услугой взятия кредита в банке ВТБ ${KREDIT}`,
      onPress: () => {
        currentPlayer.active = false;
        newCardsState.forEach(field => {
          if (field.cardOwnerId === currentPlayer.id) {
            field.cardOwnerId = undefined;
          }
        });
        if (newPlayersState.filter(player => player.active).length === 1) {
          // Дописать
          // this.endGame();
        }
        this.setState(
          {
            cards: [...newCardsState],
            players: [...newPlayersState],
          },
          this.endTurn,
        );
      },
    });
  }

  startGame() {
    const newCardsState = [...this.state.cards];
    newCardsState[0].playersIdsOnCard = [
      ...this.state.players.map(player => player.id),
    ];
    this.addAlert({
      text: `Игра началась, ходит ${this.state.players[0].id}`,
    });
    this.setState({
      gameStage: 'process',
      moveState: {
        ...this.state.moveState,
        playerId: this.state.players[0].id,
        hasDiced: false,
        moveNumber: 0,
      },
    });
    AppMetrica.reportEvent('GAME_STARTED');
  }

  onRoll(dices: [number, number]) {
    AppMetrica.reportEvent('DICES ROLLED', {id: this.state.moveState.playerId});
    this.setState({
      moveState: {
        ...this.state.moveState,
        hasDiced: true,
        dices,
        moveNumber: this.state.moveState.moveNumber + 1,
      },
    });

    const newPlayersState = JSON.parse(JSON.stringify(this.state.players));
    const newCardsState = JSON.parse(JSON.stringify(this.state.cards));

    const currentPlayer = newPlayersState.find(
      (player: IPlayer) => player.id === this.state.moveState.playerId,
    );

    if (!currentPlayer) {
      throw 'Current player not found';
    } else {
      const dicesSum: number = dices[0] + dices[1];
      const isDouble = dices[0] === dices[1];
      const oldPlayerPosition: number = currentPlayer.position;
      console.log(oldPlayerPosition, dices, dicesSum);
      const newPlayerPosition: number =
        oldPlayerPosition + dicesSum > 39
          ? oldPlayerPosition + dicesSum - 39
          : oldPlayerPosition + dicesSum;
      currentPlayer.position = newPlayerPosition;

      this.setState({players: [...newPlayersState]});

      console.log(
        'newCardsState',
        newCardsState,
        '\n\n\newPlayerPosition',
        newPlayerPosition,
      );
      const currentCard: any = newCardsState[newPlayerPosition];

      if (!currentCard) {
        throw 'Card not found';
      }

      currentCard.playersIdsOnCard.push(currentPlayer.id);
      this.setState({cards: [...newCardsState]});

      const handleDouble = () => {
        this.addAlert({text: 'Вы бросили дубль, бросайте кубики еще раз!'});
        this.setState({moveState: {...this.state.moveState, hasDiced: false}});
      };

      const endAction = isDouble
        ? () => {
            this.changeEndTurnState(newPlayersState, newCardsState);
            if (currentPlayer.balance < 0) {
              this.playerLoses(currentPlayer, newPlayersState, newCardsState);
            } else {
              handleDouble();
            }
          }
        : () => {
            if (currentPlayer.balance < 0) {
              this.playerLoses(currentPlayer, newPlayersState, newCardsState);
            }
            this.changeEndTurnState(newPlayersState, newCardsState);
            this.endTurn();
          };

      const buyCurrentCard = () => {
        currentCard.cardOwnerId = currentPlayer.id;
        currentPlayer.balance -= currentCard.price;
        this.closeModal();
        endAction();
      };

      const handleStart = () => {
        this.addAlert({
          text: `Вам начислены дивиденды, вы получаете 100w\nУзнать больше о том, что такое диведенды и не только можно в школе инвесторов ВТБ ${INVESTMENT_SCHOOL}`,
        });
        currentPlayer.balance += 100;
      };

      const handleLaw = () => {
        const isPositive = getRandomInt(2) === 1;
        const amount = (getRandomInt(10) + 1) * 10;

        if (isPositive) {
          this.addAlert({
            onPress: endAction,
            text: `Одна из компаний состоящих в вашем портфеле участвовала в судебном разбирателсьтве и выиграла суд, информация распространилась в СМИ, акции возросли в цене вы получили ${amount}, следить за подобными новостями можно в нашем телеграм канале ${TG_CHANNEL}`,
          });
          currentPlayer.balance += amount;
        } else {
          this.addAlert({
            onPress: endAction,
            text: `Одна из компаний состоящих в вашем портфеле участвовала в судебном разбирателсьтве и проиграла суд, информация распространилась в СМИ, акции упали, вы не успели их вовремя продать и потеряли ${amount}, владея информацией владеешь миром, следить за новостями инвестиционного раныка можно в нашем телеграм канале ${TG_CHANNEL}`,
          });
          currentPlayer.balance -= amount;
        }
      };

      const handleResearch = () => {
        const isPositive = getRandomInt(2) === 1;
        const amount = (getRandomInt(10) + 1) * 10;
        if (isPositive) {
          currentPlayer.balance += amount;
          this.addAlert({
            onPress: endAction,
            text: `Одна из компаний состоящих в вашем портфеле участвовала в судебном разбирателсьтве и выиграла суд, информация распространилась в СМИ, акции возросли в цене вы получили ${amount}, следить за подобными новостями можно в нашем телеграм канале ${TG_CHANNEL}`,
          });
        } else {
          currentPlayer.balance -= amount;
          this.addAlert({
            onPress: endAction,
            text: `Одна из компаний состоящих в вашем портфеле участвовала в судебном разбирателсьтве и проиграла суд, информация распространилась в СМИ, акции упали, вы не успели их вовремя продать и потеряли ${amount}, владея информацией владеешь миром, следить за новостями инвестиционного раныка можно в нашем телеграм канале ${TG_CHANNEL}`,
          });
        }
      };

      const handlePreciousMetals = () => {
        if (currentCard.cardOwnerId === currentPlayer.id) {
          endAction();
        } else if (currentCard.cardOwnerId) {
          const owner = newPlayersState.find(
            (player: IPlayer) => player.id === currentCard.cardOwnerId,
          );
          const amount = Math.floor(
            ((getRandomInt(5) + 6) / 100) * currentCard.price,
          );
          this.addCardModal({
            onPress: endAction,
            text: `Вы попытались инвестировать в драгоценные металлы, но не учли ряд факторов вы потеряли ${
              amount * 2
            }, игрок ${
              owner.id
            }, наоборот, в это время извлек выгоду из ситуации на рынке и заработал ${amount}`,
            id: currentCard.id,
            onClose: () => {
              this.closeModal();
              endAction();
            },
          });
          currentPlayer.balance -= amount * 2;
          owner.balance += amount;
          this.changeEndTurnState(newPlayersState, newCardsState);
        } else {
          const buyDisabled = currentPlayer.balance - currentCard.price < 0;
          this.addCardModal({
            id: currentCard.id,
            children: (
              <>
                <Text>
                  Вы готовы потратить время на то, чтобы разобраться в
                  ценообразовании драгметаллов на рынке? Разобравшись, вы
                  инвестируете в драгметаллы, чтобы диверсифицировать ваш
                  портфель {currentCard.price}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View style={{marginRight: 20}}>
                    <Button
                      title={buyDisabled ? 'Недостаточно средств' : 'Готов'}
                      onPress={buyCurrentCard}
                      disabled={buyDisabled}
                    />
                  </View>
                  <View>
                    <Button
                      title={'Нет'}
                      onPress={() => {
                        this.closeModal();
                        endAction();
                      }}
                    />
                  </View>
                </View>
              </>
            ),
          });
        }
      };

      const handleCurrency = () => {
        if (currentCard.cardOwnerId === currentPlayer.id) {
          endAction();
        } else if (currentCard.cardOwnerId) {
          const owner = newPlayersState.find(
            (player: IPlayer) => player.id === currentCard.cardOwnerId,
          );
          const amount = Math.floor(
            ((getRandomInt(7) + 6) / 100) * currentCard.price,
          );
          this.addCardModal({
            text: `Вы попытались инвестировать в валюту, но не учли ряд факторов вы потеряли ${
              amount * 2
            }, игрок ${
              owner.id
            }, наоборот, в это время извлек выгоду из ситуации на рынке и заработал ${amount}`,
            id: currentCard.id,
            onClose: () => {
              this.closeModal();
              endAction();
            },
          });
          currentPlayer.balance -= amount * 2;
          owner.balance += amount;
        } else {
          const buyDisabled = currentPlayer.balance - currentCard.price < 0;
          this.addCardModal({
            id: currentCard.id,
            children: (
              <>
                <Text>
                  Вы готовы потратить время на то, чтобы разобраться в
                  ценообразовании валюты на рынке? Разобравшись, вы инвестируете
                  в валюту, что поможет диверсифицировать ваши вклады{' '}
                  {currentCard.price}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View style={{marginRight: 20}}>
                    <Button
                      title={buyDisabled ? 'Недостаточно средств' : 'Готов'}
                      onPress={buyCurrentCard}
                      disabled={buyDisabled}
                    />
                  </View>
                  <View>
                    <Button
                      title={'Нет'}
                      onPress={() => {
                        this.closeModal();
                        endAction();
                      }}
                    />
                  </View>
                </View>
              </>
            ),
          });
        }
      };

      const handleShare = () => {
        if (currentCard.cardOwnerId === currentPlayer.id) {
          endAction();
        } else if (currentCard.cardOwnerId) {
          const owner = newPlayersState.find(
            (player: IPlayer) => player.id === currentCard.cardOwnerId,
          );
          const amount = Math.floor(
            ((getRandomInt(10) + 6) / 100) * currentCard.price,
          );
          this.addCardModal({
            text: `Вы попытались инвестировать в акции, в которых недостаточно хорошо разобрались вы потеряли ${
              amount * 2
            }, игрок ${
              owner.id
            } наоборот извлек выгоду из ситуации на рынке и заработал ${amount}`,
            id: currentCard.id,
            onClose: () => {
              this.closeModal();
              endAction();
            },
          });
          currentPlayer.balance -= amount * 2;
          owner.balance += amount;
        } else {
          const buyDisabled = currentPlayer.balance - currentCard.price < 0;
          this.addCardModal({
            id: currentCard.id,
            children: (
              <>
                <Text>
                  Вы готовы потратить время на то, чтобы разобраться в делах
                  компании и сфере, чтобы затем граммотно инвестировать в нее?
                  Разобравшись в акциях компании вы инвестируете в нее{' '}
                  {currentCard.price}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View style={{marginRight: 20}}>
                    <Button
                      title={buyDisabled ? 'Недостаточно средств' : 'Готов'}
                      onPress={buyCurrentCard}
                      disabled={buyDisabled}
                    />
                  </View>
                  <View>
                    <Button
                      title={'Нет'}
                      onPress={() => {
                        this.closeModal();
                        endAction();
                      }}
                    />
                  </View>
                </View>
              </>
            ),
          });
        }
      };

      const handleMarketFall = () => {
        this.addAlert({
          onPress: endAction,
          text: `На фоне падения фондового рынка вы неудачно проинвестировали деньги и потеряли 200W\nНо не волнуйтесь, в реальной жизни этого бы не случилось, ведь вы бы одним из первых получили нашу рассылку о текущих тенденциях на рынке инвестиций от ведущих аналитиков компании ВТБ (${TG_CHANNEL}) и как граммотный инвестор избежали бы ненужных трат`,
        });
        currentPlayer.balance -= 200;
      };

      const handleMarketGrow = () => {
        this.addAlert({
          onPress: endAction,
          text: `На фоне роста фондового рынка вы граммотно проинвестировали деньги и получили 300W\nУзнать больше о том, когда лучше начать инвестировать можно в приложении ${APP}`,
        });
        currentPlayer.balance += 350;
      };

      const handleRest = () => {
        this.addAlert({
          onPress: endAction,
          text: 'Вы отправились в отпуск, отдыхать очень важно!',
        });
      };

      if (newPlayerPosition < oldPlayerPosition) {
        handleStart();
      }
      if ([2, 17, 33].includes(newPlayerPosition)) {
        handleLaw();
      } else if ([7, 22, 36].includes(newPlayerPosition)) {
        handleResearch();
      } else if ([5, 15, 25, 35].includes(newPlayerPosition)) {
        handleCurrency();
      } else if ([12, 28].includes(newPlayerPosition)) {
        handlePreciousMetals();
      } else if (newPlayerPosition === 10) {
        handleMarketFall();
      } else if (newPlayerPosition === 20) {
        handleRest();
      } else if (newPlayerPosition === 30) {
        handleMarketGrow();
      } else if (newPlayerPosition === 4) {
        currentPlayer.balance -= 200;
        this.addAlert({
          onPress: endAction,
          text: 'Вы просрочили дату подачи налоговой декларации, заплатите штраф 200W',
        });
      } else if (newPlayerPosition === 38) {
        currentPlayer.balance -= 100;
        this.addAlert({
          onPress: endAction,
          text: 'Вы заплатили налоги на прибыль, потравтив 100W',
        });
      } else if (newPlayerPosition !== 0) {
        handleShare();
      }
    }
  }

  componentDidMount() {
    AppMetrica.activate({
      apiKey: 'f5e14f1f-7319-409f-b663-a1af877856b0',
      sessionTimeout: 120,
      firstActivationAsUpdate: true,
    });
    this.startGame();
  }

  render() {
    console.log(this.state.moveState);
    return (
      <View
        style={{
          position: 'relative',
          zIndex: 3,
          elevation: 3,
        }}>
        {this.state.modalsState.length !== 0 && this.state.modalsState[0]}
        {this.state.gameStage === 'start' && <Text>Start</Text>}
        {this.state.gameStage === 'process' && (
          <>
            <FixedButtonGroup>
              <SmallButton
                onPress={() => {
                  this.addModal(
                    <ModalCustom>
                      <Info
                        onClose={this.closeModal}
                        players={this.state.players}
                      />
                    </ModalCustom>,
                  );
                }}
                style={{marginBottom: 4}}
                imageSorce={settingsIcon}
              />
            </FixedButtonGroup>
            <GameField
              addCardModal={this.addCardModal}
              gameState={this.state}
              onRoll={this.onRoll}
              modalClose={this.closeModal}
              hasDiced={this.state.moveState.hasDiced}
            />
          </>
        )}
        {this.state.gameStage === 'finished' && (
          <FinishedGame
            onClose={this.closeModal}
            players={this.state.players}
            cards={this.state.cards}
          />
        )}
      </View>
    );
  }
}

export default Game;
