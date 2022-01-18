const fs = require('fs');
const {getRandomInt, shuffle, getPictureFileName} = require('../../utils')

const MAX_OFFER_COUNT = 1000;
const DEFAULT_COUNT = 1;
const MIN_OFFER_SENTENCE_COUNT = 1;
const MAX_OFFER_SENTENCE_COUNT = 5;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  'Продам коллекцию журналов «Огонёк».',
  'Отдам в хорошие руки подшивку «Мурзилка».',
  'Продам советскую посуду. Почти не разбита.',
  'Куплю детские санки.'
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
  'Кажется, что это хрупкая вещь.',
  'Мой дед не мог её сломать.',
  'Кому нужен этот новый телефон, если тут такое...',
  'Не пытайтесь торговаться. Цену вещам я знаю.'
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const generateOffers = (count ) => (
  Array(count || DEFAULT_COUNT).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(MIN_OFFER_SENTENCE_COUNT, MAX_OFFER_SENTENCE_COUNT).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

const generate = {
  name: '--generate',
  run(params) {
    const count = +params[0] || DEFAULT_COUNT;
    if (count > MAX_OFFER_COUNT) {
      return console.info('Не больше 1000 объявлений')
    }
    try {
      fs.writeFileSync(FILE_NAME, JSON.stringify(generateOffers(count)))
    } catch (err) {
      process.exit(1)
    }
    console.info(`Operation success. File created.`);
  }
}

module.exports = {generate};
