import {IRegularCard} from '../components/regularCard/regularCard';
import {
  blue,
  darkorchid,
  green,
  orange,
  red,
  saddlebrown,
  skyblue,
  yellow,
} from './colors';
import {ImageSourcePropType} from 'react-native';

const cornerImages: ImageSourcePropType[] = [
  require('../src/images/airplane.png'),
  require('../src/images/015-loss.png'),
  require('../src/images/016-profits.png'),
  require('../src/images/start.png'),
];

export const cornerFields: Array<any> = [
  {
    id: 20,
    cardName: 'Airplane',
    cardImage: cornerImages[0],
    rotationAngle: 80,
  },
  {
    id: 10,
    cardName: 'Loss',
    cardImage: cornerImages[1],
    rotationAngle: 0,
  },
  {
    id: 30,
    cardName: 'Profits',
    cardImage: cornerImages[2],
    rotationAngle: 180,
  },
  {
    id: 0,
    cardName: 'Start',
    cardImage: cornerImages[3],
    rotationAngle: 315,
  },
];

const preciousMetalsImages: ImageSourcePropType[] = [
  require('../src/images/036-diamond.png'),
  require('../src/images/020-gold-ingot.png'),
];

const currencyImages: ImageSourcePropType[] = [
  require('../src/images/025-euro.png'),
  require('../src/images/026-dollar.png'),
  require('../src/images/028-Yuan.png'),
  require('../src/images/029-pound-sterling.png'),
];

const lawImage: ImageSourcePropType = require('../src/images/003-balance.png');
const researchImage: ImageSourcePropType = require('../src/images/018-search.png');

const smallTaxImage: ImageSourcePropType = require('../src/images/035-tax.png');
const bigTaxImage: ImageSourcePropType = require('../src/images/037-tax.png');

export const fields: Array<IRegularCard> = [
  //brown
  {
    id: 1,
    cardName: 'МТС',
    cardCost: 60,
    cardType: saddlebrown,
  },
  {
    id: 2,
    cardName: 'Law',
    cardImage: lawImage,
  },
  {
    id: 3,
    cardName: 'Вымпелком',
    cardCost: 60,
    cardType: saddlebrown,
  },
  {
    id: 4,
    cardName: 'Income Tax Fine',
    cardCost: 200,
    cardImage: bigTaxImage,
  },
  {
    id: 5,
    cardName: 'Euro',
    cardCost: 200,
    cardImage: currencyImages[0],
  },
  //blue
  {
    id: 6,
    cardName: 'Nike',
    cardCost: 100,
    cardType: skyblue,
  },
  {
    id: 7,
    cardName: 'Research',
    cardImage: researchImage,
  },
  {
    id: 8,
    cardName: 'Adidas',
    cardCost: 100,
    cardType: skyblue,
  },
  {
    id: 9,
    cardName: 'Louis Vuitton',
    cardCost: 120,
    cardType: skyblue,
  },

  // rose
  {
    id: 11,
    cardName: 'Аэрофлот',
    cardCost: 140,
    cardType: darkorchid,
    rotationType: 'right',
  },
  {
    id: 12,
    cardName: 'Diamonds',
    cardCost: 200,
    cardImage: preciousMetalsImages[0],
    rotationType: 'right',
  },
  {
    id: 13,
    cardName: 'S7',
    cardCost: 140,
    cardType: darkorchid,
    rotationType: 'right',
  },
  {
    id: 14,
    cardName: 'Deutsche Lufthansa',
    cardCost: 160,
    cardType: darkorchid,
    rotationType: 'right',
  },
  {
    id: 15,
    cardName: 'Dollar',
    cardCost: 200,
    cardImage: currencyImages[1],
    rotationType: 'right',
  },

  //orange
  {
    id: 16,
    cardName: 'McDonald’s',
    cardCost: 180,
    cardType: orange,
    rotationType: 'right',
  },
  {
    id: 17,
    cardName: 'Law',
    cardImage: lawImage,
    rotationType: 'right',
  },
  {
    id: 18,
    cardName: 'Starbucks',
    cardCost: 180,
    cardType: orange,
    rotationType: 'right',
  },
  {
    id: 19,
    cardName: 'Nestle',
    cardCost: 200,
    cardType: orange,
    rotationType: 'right',
  },
  //red
  {
    id: 21,
    cardName: 'Pfizer',
    cardCost: 220,
    cardType: red,
    rotationType: 'bottom',
  },
  {
    id: 22,
    cardName: 'Research',
    cardImage: researchImage,
    rotationType: 'bottom',
  },
  {
    id: 23,
    cardName: 'AstraZeneca',
    cardCost: 240,
    cardType: red,
    rotationType: 'bottom',
  },
  {
    id: 24,
    cardName: 'Bayer Pharma AG',
    cardCost: 240,
    cardType: red,
    rotationType: 'bottom',
  },
  {
    id: 25,
    cardName: 'Yuan',
    cardCost: 200,
    cardImage: currencyImages[2],
    rotationType: 'bottom',
  },

  //yellow
  {
    id: 26,
    cardName: 'Яндекс',
    cardCost: 260,
    cardType: yellow,
    rotationType: 'bottom',
  },

  {
    id: 27,
    cardName: 'Apple Inc',
    cardCost: 260,
    cardType: yellow,
    rotationType: 'bottom',
  },
  {
    id: 28,
    cardName: 'Gold',
    cardCost: 200,
    cardImage: preciousMetalsImages[1],
    rotationType: 'bottom',
  },

  {
    id: 29,
    cardName: 'Microsoft Corp',
    cardCost: 280,
    cardType: yellow,
    rotationType: 'bottom',
  },

  //green
  {
    id: 31,
    cardName: 'Сбербанк',
    cardCost: 300,
    cardType: green,
    rotationType: 'left',
  },

  {
    id: 32,
    cardName: 'МКБ',
    cardCost: 300,
    cardType: green,
    rotationType: 'left',
  },

  {
    id: 33,
    cardName: 'Law',
    cardImage: lawImage,
    rotationType: 'left',
  },
  {
    id: 34,
    cardName: 'ВТБ',
    cardCost: 320,
    cardType: green,
    rotationType: 'left',
  },

  {
    id: 35,
    cardName: 'Pound',
    cardCost: 200,
    cardImage: currencyImages[3],
    rotationType: 'left',
  },

  {
    id: 36,
    cardName: 'Research',
    cardImage: researchImage,
    rotationType: 'left',
  },

  //skyblue
  {
    id: 37,
    cardName: 'Газпром',
    cardCost: 350,
    cardType: blue,
    rotationType: 'left',
  },
  {
    id: 38,
    cardName: 'Income Tax',
    cardCost: 100,
    cardImage: smallTaxImage,
    rotationType: 'left',
  },

  {
    id: 39,
    cardName: 'Роснефть',
    cardCost: 400,
    cardType: blue,
    rotationType: 'left',
  },
];
