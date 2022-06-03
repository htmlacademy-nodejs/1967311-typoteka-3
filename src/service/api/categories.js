'use strict';

const {Router} = require(`express`);

const categoryRouter = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, categoryRouter);

  categoryRouter.get(`/`, (req, res) => {
    return res.send(categoryService.findAll());
  });

};
