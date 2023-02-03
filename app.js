const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./helpers/AppError');
const globalErrorHandler = require('./controllers/errorController');
const usersRouter = require('./routes/usersRoutes');
const favoritesSongs = require('./routes/favoriteSongRoutes');
const toursRouter = require('./routes/toursRoutes');
const postRouter = require('./routes/postRoutes');
const viewRouter = require('./routes/viewRoutes');
const morgan = require('morgan');
const {
  allVersion,
  allBooks,
  versesChapterOfBook,
  searchByWordsSentences,
  searchByBookChapter_Verse,
  getOne,
} = require('./controllers/bibleController');

const app = express();
app.use(cors());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Global miMddlewares

//static files
app.use(express.static(path.join(__dirname, 'public')));

// set header security
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'self'",
          'https:',
          'http:',
          'blob:',
          'https://*.mapbox.com',
          'https://js.stripe.com',
          'https://m.stripe.network',
          'https://*.cloudflare.com',
        ],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        workerSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://*.tiles.mapbox.com',
          'https://api.mapbox.com',
          'https://events.mapbox.com',
          'https://m.stripe.network',
        ],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        formAction: ["'self'"],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          'data:',
          'blob:',
          'https://*.stripe.com',
          'https://*.mapbox.com',
          'https://*.cloudflare.com/',
          'https://bundle.js:*',
          'ws://127.0.0.1:*/',
        ],
        upgradeInsecureRequests: [],
      },
    },
  })
);

//development logging
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

//limit request for same api
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request ',
});
app.use('/api', limiter);

//body parser , reading dat from the req.body
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//data sanitizations against nosql query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//prevent parameters pollution
app.use(
  hpp({
    whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'price', 'difficulty'],
  })
);

//testing middleware

app.use((req, res, next) => {
  res.set('Content-Security-Policy', 'connect-src *');
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/favorites-songs', favoritesSongs);
app.use('/api/v1/posts', postRouter);

// chants
app.use('/api/v1/books', require('./routes/bookRoutes'));
app.use('/api/v1/songs', require('./routes/songRoutes'));

// bibles

app.get('/api/v1/bible/versions', allVersion);
app.get('/api/v1/bible/books', allBooks);
app.get('/api/v1/bible/books/:id', getOne);
app.get('/api/v1/bible/versesChapterOfBook/:bookNumber/:chapter', versesChapterOfBook);
app.get('/api/v1/bible/searchByWroksSentences/', searchByWordsSentences);
app.get('/api/v1/bible/searchByBookChapter_Verse', searchByBookChapter_Verse);

//error for any other wrong url
app.all('*', (req, res, next) => {
  next(new AppError(`can´t find the url ${req.originalUrl} for this server...`, 400));
});

//Global error
app.use(globalErrorHandler);

module.exports = app;
