const bookshelf = require('../bookshelf');

const Author = bookshelf.model('Author', {
  tableName: 'authors',
  books: function () {
    return this.hasMany('Book');
  },
});

module.exports = Author;
