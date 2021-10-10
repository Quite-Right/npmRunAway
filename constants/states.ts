import {playerIcons} from './players';
import {cards} from './cards';
import {IGameState} from '../components/game/game';

export const initialGameState: IGameState = {
  gameStage: 'process',
  moveState: {
    playerId: undefined,
    dices: [6, 6],
    hasDiced: false,
    moveNumber: 0,
  },
  players: [
    {
      id: 'Игрок 1',
      balance: 1000,
      index: 0,
      active: true,
      position: 0,
      playerIcon: playerIcons[0],
    },
    {
      id: 'Игрок 2',
      balance: 1000,
      index: 1,
      active: true,
      position: 0,
      playerIcon: playerIcons[1],
    },
  ],
  modalsState: [],
  cards,
};
