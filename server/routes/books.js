const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.route('/').get((req, res) => {
  Book.where(req.query)
    .fetchAll({
      withRelated: [
        {
          authors: (qb) => {
            qb.column('id', 'name'); // filter out what's being returned, e.g. not making emails public
          },
        },
      ],
    })
    .then((books) => {
      res.status(200).json(books);
    });
});

module.exports = router;
