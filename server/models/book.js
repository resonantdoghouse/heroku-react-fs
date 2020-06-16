const bookshelf = require('../bookshelf');

const Book = bookshelf.model('Book', {
  tableName: 'books',
  authors: function () {
    return this.belongsTo('Author');
  },
});

module.exports = Book;
