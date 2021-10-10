import React from 'react';
import {StyleSheet, View, Text, ImageSourcePropType, Image} from 'react-native';
import {TCardColorType} from '../../constants';
import CardContainer from '../cardContainer/cardContainer';
import {IPlayer} from '../game/game';
import Player from '../player/player';

export interface IRegularCard {
  rotationType?: 'bottom' | 'left' | 'right';
  cardType?: TCardColorType;
  cardName?: string;
  cardCost?: number;
  cardImage?: ImageSourcePropType;
  id: number;
  big?: boolean;
  playersOnCard?: IPlayer[];
  onPress?: () => void;
}

const RegularCard = ({
  cardType,
  cardName,
  cardCost,
  rotationType,
  cardImage,
  big = false,
  playersOnCard,
  onPress,
}: IRegularCard) => {
  return (
    <CardContainer big={big} rotationType={rotationType} onPress={onPress}>
      {cardType && cardName && cardCost && (
        <>
          <View style={[styles.shareCardHeader, {backgroundColor: cardType}]} />
          <View style={styles.shareCardBody}>
            <Text style={styles.shareCardName}>{cardName}</Text>
            <Text style={styles.shareCardCost}>{cardCost}W</Text>
          </View>
        </>
      )}
      {cardName && cardImage && cardCost && (
        <View style={styles.currencyCardContainer}>
          <Text style={styles.currencyCardHeader}>{cardName}</Text>
          <Image style={styles.currencyCardImage} source={cardImage} />
          <Text style={styles.currencyCardCost}>{cardCost}W</Text>
        </View>
      )}
      {cardName && cardImage && !cardCost && (
        <View style={styles.cardCardContainer}>
          <Text style={styles.cardCardHeader}>{cardName}</Text>
          <Image style={styles.cardCardImage} source={cardImage} />
          <Text style={styles.cardCardFooter}>?</Text>
        </View>
      )}
      {playersOnCard && (
        <View style={[styles.players]}>
          <View style={styles.playersInnerContainer}>
            {playersOnCard.map(player => (
              <Player key={player.id} imageSorce={player.playerIcon} />
            ))}
          </View>
        </View>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  // shares
  shareCardBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
  shareCardHeader: {
    height: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  shareCardName: {
    textAlign: 'center',
  },
  shareCardCost: {
    textAlign: 'center',
  },
  // currencies
  currencyCardHeader: {},
  currencyCardContainer: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyCardCost: {},
  currencyCardImage: {
    width: 80,
    height: 80,
  },
  // cards (research | law)
  cardCardHeader: {},
  cardCardContainer: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCardFooter: {},
  cardCardImage: {
    width: 80,
    height: 80,
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

export default RegularCard;
