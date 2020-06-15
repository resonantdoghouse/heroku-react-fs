const booksData = require('../seed_data/books');
const authorsData = require('../seed_data/authors');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('authors')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert(authorsData);
    })
    .then(() => {
      return knex('books').del();
    })
    .then(() => {
      // Inserts seed entries
      return knex('authors')
        .pluck('id')
        .then((authorIds) => {
          return authorIds;
        });
    })
    .then((authorIds) => {
      const bookDataWithAuthorIds = booksData.map((books) => {
        books.author_id =
          authorIds[Math.floor(Math.random() * authorIds.length)];
        return books;
      });
      return knex('books').insert(bookDataWithAuthorIds);
    });
};
