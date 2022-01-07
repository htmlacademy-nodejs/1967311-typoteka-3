const fs = require('fs').promises;
const {getRandomInt, shuffle, getPictureFileName} = require('../../utils');
const chalk = require('chalk');

const MAX_OFFER_COUNT = 1000;
const DEFAULT_COUNT = 1;
const MIN_OFFER_SENTENCE_COUNT = 1;
const MAX_OFFER_SENTENCE_COUNT = 5;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `../../data/sentences.txt`;
const FILE_TITLES_PATH = `../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `../../data/categories.txt`;

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
        return console.error(chalk.red('Не больше 1000 объявлений'))
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
