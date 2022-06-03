'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

module.exports = (app, articleService) => {
  app.use(`/articles`, articlesRouter);

  articlesRouter.get(`/`, (req, res) => {
    return res.send(articleService.findAll());
  });

  articlesRouter.get(`/:id`, (req, res) => {
    const {id} = req.params;

    return res.send(articleService.findOne(id));
  });

  articlesRouter.post(`/`, (req, res) => {
    const {title, announce, fullText, category, comments} = req.body;

    if (!title || !announce || !fullText || !category) {
      return res.sendStatus(400);
    }
    return res.send(articleService.create({title, announce, fullText, category, comments}));
  });

  articlesRouter.put('/', (req, res) => {
    const {id} = req.body;

    const {title, announce, fullText, category, comments } = req.body;

    if (!title || !announce || !fullText || !category) {
      return res.sendStatus(400);
    }

    return res.send(articleService.update(id, {title, announce, fullText, category, comments } ))
  })

  articlesRouter.delete('/:articleId', (req, res) => {
    const {articleId} = req.params;
    return res.send(articleService.delete(articleId))
  })

  articlesRouter.get(`/:articleId/comments`, (req, res) => {
    return res.send(articleService.findComments(req.params.articleId));
  });

  articlesRouter.get(`/:articleId/comments/:commentId`, (req, res) => {
    return res.send(articleService.findComment(req.params.articleId, req.params.commentId));
  });

  articlesRouter.post('/:articleId/comments', (req, res) => {
    const {text} = req.body;
    if (text) {
      return res.sendStatus(400);
    }
    return res.send(articleService.createComment(req.params.articleId, {text}));
  });

  articlesRouter.delete('/:articleId/comments/:commentId', (req, res) => {
    const {articleId, commentId} = req.params;

    return res.send(articleService.deleteComment(articleId, commentId))
  })

};
