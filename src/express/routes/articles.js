'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/articles/category/:id`, (req, res) => {
  return res.send(`/articles/category/:id`);
});

articlesRouter.get(`/articles/add`, (req, res) => {
  return res.render(`post-detail`, {});
});

articlesRouter.get(`/search`, (req, res) => {
  return res.render(`search`, {});
});

articlesRouter.get(`/articles/edit/:id`, (req, res) => {
  return res.render(`post`, {});
});

articlesRouter.get(`/articles/:id`, (req, res) => {
  return res.send(`/articles/:id ${req.params.id}`);
});

module.exports = articlesRouter;
