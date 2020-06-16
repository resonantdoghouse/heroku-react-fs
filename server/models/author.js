const bookshelf = require('../bookshelf');

const Author = bookshelf.model('Author', {
  tableName: 'authors',
  authors: function () {
    return this.hasMany('Book');
  },
});

module.exports = Author;
