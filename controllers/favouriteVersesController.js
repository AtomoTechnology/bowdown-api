const { connect } = require('../db');
const AppError = require('../helpers/AppError');
const catchAsync = require('../helpers/catchAsync');
const FavoriteSong = require('../model/favoriteSongModel');
const factory = require('./handlerFactory1');

exports.GetAll = (req, res, next) => {
  let query = ' SELECT * FROM favouriteVerses ';
  if (req.query.userId) {
    query += ` WHERE userId = '${req.query.userId}'`;
  }

  connect('ATESPIEDSJESUS.SQLite3').all(query, (err, rows) => {
    if (err) return next(new AppError(err.message, 400));
    res.json({ ok: true, results: rows.length, status: 'success', code: 200, data: rows });
  });
};
exports.Create = (req, res, next) => {
  const { userId, verses, texts, note, color, type, bookName, chapter } = req.body;
  console.log(req.body);
  let query = `INSERT INTO favouriteVerses (userId,verses,texts,note,color,type,bookName,chapter) values(
   '${userId}', '${verses}', '${texts}', '${note}', '${color}', '${type}', '${bookName}', '${chapter}' 
  )`;

  connect('ATESPIEDSJESUS.SQLite3').all(query, (err, rows) => {
    if (err) return next(new AppError(err.message, 400));

    res.json({ ok: true, status: 'success', code: 200 });
  });
};
exports.deleteFavoriteSong = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError('The id is required to delete a favourite verse.', 400));
  }
  let query = `DELETE FROM  favouriteVerses WHERE  id = '${req.params.id}'`;

  connect('ATESPIEDSJESUS.SQLite3').all(query, (err, rows) => {
    if (err) return next(new AppError(err.message, 400));
    console.log(rows);
    res.json({ ok: true, status: 'success', code: 200 });
  });
};
