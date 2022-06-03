class CategoryService {
  constructor(categories) {
    this._categories = categories;
  }
  findAll() {
    return this._categories;
  }
}

module.exports = CategoryService;
