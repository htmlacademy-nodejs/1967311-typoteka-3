const { Router } = require('express');

const myRouter = new Router();

myRouter.get('/my', (req, res) => {
  return res.send('/my')
})

myRouter.get('/my/comments', (req, res) => {
  return res.send('/my/comments')
})

myRouter.get('/my/categories', (req, res) => {
  return res.send('/my/categories')
})


module.exports = myRouter;




