const bookshelf = require('../bookshelf');

const Author = bookshelf.model('Author', {
  tableName: 'authors',
  inventories: function () {
    return this.hasMany('Book');
  },
});

module.exports = Author;
