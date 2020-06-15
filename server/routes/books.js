const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.route('/').get((req, res) => {
  Book.where(req.query)
    .fetchAll({ withRelated: ['authors'] })
    .then((books) => {
      res.status(200).json(books);
    });
});

module.exports = router;
