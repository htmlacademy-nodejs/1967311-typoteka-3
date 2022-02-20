'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/my`, (req, res) => {
  return res.render(`my`);
});

myRouter.get(`/my/comments`, (req, res) => {
  return res.render(`comments`, {});
});

myRouter.get(`/my/categories`, (req, res) => {
  return res.render(`all-categories`, {});
});


module.exports = myRouter;


