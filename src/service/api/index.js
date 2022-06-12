const {Router} = require(`express`);
const { getMockData } = require('../lib/get-mock-data');
const {
  ArticleService,
  CategoryService,
} = require(`../data-service`);
const articles = require('./articles');
const categories = require('./categories');
const search = require('./search');

const app = new Router();

(async () => {
  const mockData = await getMockData();

  const articleService = new ArticleService(mockData);
  articles(app, articleService);
  categories(app, new CategoryService(mockData));
  search(app, articleService);

})();

module.exports = app;
