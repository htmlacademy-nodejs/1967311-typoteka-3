const { Router } = require('express');

const authRouter = new Router();

authRouter.get('/register', (req, res) => {
  return res.send('/register')
})

authRouter.get('/login', (req, res) => {
  return res.send('/login')
})

module.exports = authRouter;
