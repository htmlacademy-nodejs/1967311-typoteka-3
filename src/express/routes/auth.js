'use strict';

const {Router} = require(`express`);

const authRouter = new Router();

authRouter.get(`/register`, (req, res) => {
  return res.render(`sign-up`, {});
});

authRouter.get(`/login`, (req, res) => {
  return res.render(`login`, {});
});

module.exports = authRouter;
