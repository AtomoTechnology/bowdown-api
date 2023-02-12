const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AppError = require('./helpers/AppError');
const globalErrorHandler = require('./controllers/errorController');
const morgan = require('morgan');

const { getAll } = require('./controllers/devotionController');
// const User = require('./schemas/user');
// const Song = require('./schemas/song');
// require('./schemas/verseOfTheDay');
// const FavouriteSong = require('./schemas/favouriteSong');
const app = express();
app.use(cors());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Global miMddlewares

// const { dbConnect } = require('./db/index');
// dbConnect
//   .sync({ force: true })
//   .then((res) => {
//     console.log('joya!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

//development logging
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

//body parser , reading dat from the req.body
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', require('./routes/usersRoutes'));

// // chants
// app.use('/api/v1/books', require('./routes/bookRoutes'));
app.use('/api/v1/songs', require('./routes/songRoutes'));
app.use('/api/v1/songs-categories', require('./routes/songCategoryRoutes'));
app.use('/api/v1/favorites-songs', require('./routes/favoriteSongRoutes'));
// app.use('/api/v1/favorites-verses', require('./routes/favouriteVersesRoute'));

// bibles
app.use('/api/v1/bible', require('./routes/bibleRoutes'));
app.use('/api/v1/verse-of-the-day', require('./routes/verseDayRoutes'));
// app.get('/api/v1/bible/versesChapterOfBook/:bookNumber/:chapter', versesChapterOfBook);
// app.get('/api/v1/bible/searchByWroksSentences/', searchByWordsSentences);
// app.get('/api/v1/bible/searchByBookChapter_Verse', searchByBookChapter_Verse);

// devotions
// app.get('/api/v1/devotions', getAll);

app.all('*', (req, res, next) => next(new AppError(`can´t find the url ${req.originalUrl} for this server...`, 400)));

app.use(globalErrorHandler);
module.exports = app;
