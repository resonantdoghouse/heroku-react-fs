const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.route('/').get((req, res) => {
  Book.where(req.query)
    .fetchAll({
      withRelated: [
        {
          authors: function (qb) {
            qb.column('id', 'name');
          },
        },
      ],
    })
    .then((books) => {
      res.status(200).json(books);
    });
});

module.exports = router;
