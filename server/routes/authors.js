const express = require('express');
const Author = require('../models/author');
const router = express.Router();

/**
 * Get authors
 */
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

/**
 * Post author
 */
router.route('/').post((req, res) => {
  const { name, email, bio } = req.body;
  Author.forge({
    name,
    email,
    bio,
  })
    .save()
    .then((results) => {
      res.json({ response: results });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

/**
 * Update author
 */
router.route('/:id').put((req, res) => {
  const { name, email, bio } = req.body;
  Author.where('id', req.params.id)
    .fetch()
    .then((author) => {
      author.save({ name, email, bio }).then((results) => {
        res.json({ response: results });
      });
    })
    .catch((err) => {
      if (err.message === 'EmptyResponse') {
        res.json({ response: 'no authors with that id' });
      } else {
        res.json({ error: err });
      }
    });
});

/**
 * TODO add delete author 👇
 */

module.exports = router;
