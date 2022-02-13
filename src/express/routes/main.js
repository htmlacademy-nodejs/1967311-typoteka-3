const { Router } = require('express');

const mainRouter = new Router();

mainRouter.get('/', (req, res) => {
  return res.send('/')
})


module.exports = mainRouter;



