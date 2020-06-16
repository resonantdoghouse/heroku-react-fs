const express = require('express');
const Author = require('../models/author');
const router = express.Router();

router.route('/').get((req, res) => {
  Author.where(req.query)
    .fetchAll()
    .then((authors) => {
      const authorsMapped = authors.map((author) => {
        return {
          id: author.id,
          name: author.attributes.name,
        };
      });
      res.status(200).json(authorsMapped);
    });
});

module.exports = router;
