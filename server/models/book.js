const bookshelf = require('../bookshelf');

const Book = bookshelf.model('Book', {
  tableName: 'books',
  author: function () {
    return this.belongsTo('Author');
  },
});

module.exports = Book;
