import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export interface ICardContainerProps {
  rotationType?: 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  id?: number;
  big: boolean;
  onPress?: () => void;
}

const CardContainer = ({
  rotationType,
  children,
  big,
  onPress,
}: ICardContainerProps) => {
  const [sizesStyle, rotationStyle] = useMemo(() => {
    switch (rotationType) {
      case 'bottom':
        return [undefined, styles.rotateBottom];
      case 'left':
        return [styles.rotatedCardContainer, styles.rotateLeft];
      case 'right':
        return [styles.rotatedCardContainer, styles.rotateRight];
      default:
        return [undefined, styles.noRotation];
    }
  }, [rotationType]);
  return (
    <View
      style={[styles.cardContainer, sizesStyle, big && styles.noRotationBig]}>
      <TouchableOpacity
        onPress={onPress}
        style={[rotationStyle, styles.card, big && styles.noRotationBig]}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
  },
  rotatedCardContainer: {
    width: 200,
    height: 100,
  },
  card: {
    borderWidth: 2,
    borderColor: 'black',
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
  },
  noRotation: {
    width: 100,
    height: 200,
  },
  noRotationBig: {
    width: 200,
    height: 400,
  },
});

export default CardContainer;
