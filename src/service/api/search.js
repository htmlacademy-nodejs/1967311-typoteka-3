'use strict';

const {Router} = require(`express`);

const searchRouter = new Router();

module.exports = (app, articleService) => {
  app.use(`/`, searchRouter);

  searchRouter.get('/search', (req, res)=> {
    return res.send(articleService.searchPosts(req.params.query))
  })

};
