'use strict';

const fs = require(`fs/promises`);
const {getRandomInt, shuffle} = require(`../../utils`);
const chalk = require(`chalk`);
const path = require(`path`);

const MAX_OFFER_COUNT = 1000;
const DEFAULT_COUNT = 1;
const MIN_ANNOUNCE_SENTENCE_COUNT = 1;
const MAX_ANNOUNCE_SENTENCE_COUNT = 5;
const MIN_FULLTEXT_SENTENCE_COUNT = 10;
const MAX_FULLTEXT_SENTENCE_COUNT = 50;

const FILE_SENTENCES_PATH = path.join(__dirname, `../../../data/sentences.txt`);
const FILE_TITLES_PATH = path.join(__dirname, `../../../data/titles.txt`);
const FILE_CATEGORIES_PATH = path.join(__dirname, `../../../data/categories.txt`);

const CREATE_DATES = [
  new Date(2022, 1, 2),
  new Date(2021, 11, 11),
  new Date(2021, 10, 29),
];

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter((string) => !!string).map((string) => string.trim());
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = ({count, titles, categories, sentences}) => (
  Array(count || DEFAULT_COUNT).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: CREATE_DATES[getRandomInt(0, CREATE_DATES.length)],
    announce: shuffle(sentences).slice(MIN_ANNOUNCE_SENTENCE_COUNT, MAX_ANNOUNCE_SENTENCE_COUNT).join(` `),
    fullText: shuffle(sentences).slice(MIN_FULLTEXT_SENTENCE_COUNT, MAX_FULLTEXT_SENTENCE_COUNT).join(` `),
    category: shuffle(categories).slice(getRandomInt(0, categories.length - 1))
  }))
);

const generate = {
  name: `--generate`,
  async run(params) {
    const [sentences, titles, categories] = await Promise.all([
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TITLES_PATH),
      readContent(FILE_CATEGORIES_PATH)
    ]);

    const count = +params[0] || DEFAULT_COUNT;
    if (count > MAX_OFFER_COUNT) {
      return console.error(chalk.red(`Не больше ${MAX_OFFER_COUNT} постов`));
    }
    try {
      await fs.writeFile(FILE_NAME, JSON.stringify(generateOffers({count, titles, categories, sentences})));
    } catch (err) {
      console.error(`generation error: `, err);
      process.exit(1);
    }
    console.log(chalk.green(`Operation success. File created.`));
    return null;
  }
};

module.exports = {generate};
