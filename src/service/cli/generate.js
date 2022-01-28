const fs = require('fs').promises;
const { getRandomInt, shuffle } = require('../../utils');
const chalk = require('chalk');

const MAX_OFFER_COUNT = 1000;
const DEFAULT_COUNT = 1;
const MIN_ANNOUNCE_SENTENCE_COUNT = 1;
const MAX_ANNOUNCE_SENTENCE_COUNT = 5;
const MIN_FULLTEXT_SENTENCE_COUNT = 10;
const MAX_FULLTEXT_SENTENCE_COUNT = 50;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `../../data/sentences.txt`;
const FILE_TITLES_PATH = `../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `../../data/categories.txt`;
const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  'Обзор новейшего смартфона',
  'Лучшие рок-музыканты 20-века',
  'Как начать программировать',
  'Учим HTML и CSS',
  'Что такое золотое сечение',
  'Как собрать камни бесконечности',
  'Борьба с прокрастинацией',
  'Рок — это протест',
  'Самый лучший музыкальный альбом этого года'
];

const SENTENCES = [
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  'Золотое сечение — соотношение двух величин, гармоническая пропорция.',
  'Собрать камни бесконечности легко, если вы прирожденный герой.',
  'Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.',
  'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.',
  'Программировать не настолько сложно, как об этом говорят.',
  'Простые ежедневные упражнения помогут достичь успеха.',
  'Это один из лучших рок-музыкантов.',
  'Он написал больше 30 хитов.',
  'Из под его пера вышло 8 платиновых альбомов.',
  'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.',
  'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?',
  'Достичь успеха помогут ежедневные повторения.',
  'Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.',
  'Как начать действовать? Для начала просто соберитесь.',
  'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.',
  'Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.'
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  'Кино',
  'Программирование',
  'Железо'
];

const CREATE_DATES = [
  new Date(2022, 1, 2),
  new Date(2021, 11, 11),
  new Date(2021, 10, 29),
]

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences ) => (
  Array(count || DEFAULT_COUNT).fill({}).map(() => ({
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(MIN_OFFER_SENTENCE_COUNT, MAX_OFFER_SENTENCE_COUNT).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: CREATE_DATES[getRandomInt(0, CREATE_DATES.length)],
    announce: shuffle(SENTENCES).slice(MIN_ANNOUNCE_SENTENCE_COUNT, MAX_ANNOUNCE_SENTENCE_COUNT).join(` `),
    fullText: shuffle(SENTENCES).slice(MIN_FULLTEXT_SENTENCE_COUNT, MAX_FULLTEXT_SENTENCE_COUNT).join(` `),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);


const generate = {
  name: '--generate',
    async run(params) {
      const sentences = await readContent(FILE_SENTENCES_PATH);
      const titles = await readContent(FILE_TITLES_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);

      const count = +params[0] || DEFAULT_COUNT;
      if (count > MAX_OFFER_COUNT) {
        return console.error(chalk.red('Не больше 1000 постов'))
      }
      try {
        await fs.writeFile(FILE_NAME, JSON.stringify(generateOffers(count, titles, categories, sentences)))
      } catch (err) {
        console.error('generation error: ', err);
        process.exit(1)
      }
      console.log(chalk.green(`Operation success. File created.`));
    }
}

module.exports = {generate};
