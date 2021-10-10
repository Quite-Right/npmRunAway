import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {getRandomInt} from '../../utils';

const diceRoute = '../../src/images/Terning';
const diceExtension = '.png';

const dices = [
  require(`${diceRoute}1${diceExtension}`),
  require(`${diceRoute}2${diceExtension}`),
  require(`${diceRoute}3${diceExtension}`),
  require(`${diceRoute}4${diceExtension}`),
  require(`${diceRoute}5${diceExtension}`),
  require(`${diceRoute}6${diceExtension}`),
];

interface IDiceProps {
  onDiceChange: (values: [number, number]) => void;
  isActive?: boolean;
}

const Dice = ({onDiceChange, isActive = true}: IDiceProps) => {
  const [values, setValues] = useState([6, 6]);

  const randomizeValues = () => {
    const newValues: [number, number] = [
      getRandomInt(6) + 1,
      getRandomInt(6) + 1,
    ];
    setValues(newValues);
    if (onDiceChange) {
      onDiceChange(newValues);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={randomizeValues} disabled={!isActive}>
      <View style={styles.diceView}>
        <Image
          source={dices[values[0] - 1]}
          width={180}
          height={180}
          style={[
            styles.dice1,
            {
              transform: [
                {
                  rotateZ: `${getRandomInt(360)}deg`,
                },
              ],
            },
          ]}
        />
        <Image
          source={dices[values[1] - 1]}
          width={180}
          height={180}
          style={[
            styles.dice2,
            {
              transform: [
                {
                  rotateZ: `${getRandomInt(360)}deg`,
                },
              ],
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  diceView: {
    flexDirection: 'row',
  },
  dice1: {
    position: 'relative',
    top: -25,
    marginRight: 70,
  },
  dice2: {
    position: 'relative',
    top: 25,
  },
});

export default Dice;
