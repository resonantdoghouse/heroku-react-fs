const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);

// serve static files, create react app build
app.use(express.static(path.resolve(__dirname, '../client/build')));

const Author = require('./models/author');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'passwd',
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      // console.log(req);
      // request object is now first argument
      // ...
      console.log('req.body.email', req.body.email);
      console.log('req.body.passwd', req.body.passwd);
      // Author.collection().fetch().then((customers) => {
      //   // ...
      // })

      Author.where({ id: 2 })
        .fetch()
        .then((results) => {
          console.log('author', results.attributes.name);

          // res.status(200).json(authors);
          done();
        })
        .catch((err) => {
          console.log('err', err);
          // res.status(400).json(err);
          done();
        });
    }
  )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

const booksRoute = require('./routes/books');
const authorsRoute = require('./routes/authors');

app.get('/login', (req, res) => {
  res.json({ message: 'please login' });
});

app.get('/api', (_req, res) => {
  res.json({
    apiInfo: 'Backend express server, see some routes below',
    routes: [
      {
        url: 'http://localhost:5000/books',
        methods: ['GET'],
      },
      {
        url: 'http://localhost:5000/authors',
        methods: ['GET'],
      },
    ],
  });
});

app.use('/books', booksRoute);
app.use('/authors', authorsRoute);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (_req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, console.log(`[app]: http://localhost:${PORT}`));
