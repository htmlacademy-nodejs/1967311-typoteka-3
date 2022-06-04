const { nanoid } = require('nanoid');
const {MAX_ID_LENGTH} = require("../../constants");

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }
  findAll() {
    return this._articles;
  }
  findOne(id) {
    return this._articles.find(article => article.id = id)
  };
  create(article) {
    const newArticle = {...article, id: nanoid(MAX_ID_LENGTH)}
    this._articles.push(newArticle);
    return newArticle;
  }
  update(id, article) {
    const oldArticle = this._articles.find(article => article.id = id);
    return Object.assign(oldArticle, article);
  };
  delete(id) {

    this._articles = this._articles.filter(article => article.id !== id);
    return id;
  }

  findComments(articleId) {
    return this._articles.find(article=> article.id === articleId)?.comments || [];
  }

  findComment(articleId, commentId) {
    return this.findComments(articleId).find(comment => comment.id === commentId)
  }

  createComment(articleId, comment) {
    const newComment = {...comment, id: nanoid(MAX_ID_LENGTH)}
    this._articles.find(article => article.id === articleId)?.comments.push(newComment);
    return newComment;
  }

  deleteComment(articleId, commentId) {
    this._articles = this._articles.map(article => (
      {
        ...article,
        comments: article.id === articleId ? article.comments.filter(comment => {
          return comment.id !== commentId;
        }) : article.comments
      } ))
    return commentId;
  }

  searchPosts(query) {
    return this._articles.find(article => (new RegExp(query)).test(article.title))
  }
}

module.exports = ArticleService;
