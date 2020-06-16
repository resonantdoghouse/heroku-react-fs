const express = require('express');
const path = require('path');
const booksRoute = require('./routes/books');
const authorsRoute = require('./routes/authors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files, create react app build
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (_req, res) => {
  res.json({
    apiInfo: 'Backend express server, see some routes below',
    routes: [
      {
        path: '/api/books',
        methods: ['GET'],
      },
      {
        path: '/api/authors',
        methods: ['GET', 'POST'],
      },
    ],
  });
});

app.use('/api/books', booksRoute);
app.use('/api/authors', authorsRoute);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (_req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, console.log(`[app]: http://localhost:${PORT}`));
