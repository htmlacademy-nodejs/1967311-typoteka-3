'use strict';

const {Router} = require(`express`);

const errorsRouter = new Router();

errorsRouter.use(`*`, (req, res) => {
  res.status(404).render(`404`, {});
});

errorsRouter.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).render(`500`, {});
});

module.exports = errorsRouter;
