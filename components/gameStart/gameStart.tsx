import React from 'react';
import {View} from 'react-native';

interface IPlayer {
  currentFieldId: number;
  id: string;
}

interface IGameStartProps {
  onValidatePlayers?: (players: string[]) => void;
}

const GameStart = ({}: IGameStartProps) => {
  return <View />;
};

export default GameStart;
