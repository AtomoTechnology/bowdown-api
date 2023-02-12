const factory = require('./factoryController');
const VerseDay = require('./../schemas/verseOfTheDay');
const catchAsync = require('../helpers/catchAsync');
const { connect } = require('../db');

exports.GetAll = factory.all(VerseDay);
exports.GetOne = factory.findOne(VerseDay);

exports.Create = factory.create(VerseDay, ['bookName', 'verse', 'chapter', 'text', 'bookNumber', 'version']);

exports.Destroy = factory.destroy(VerseDay);

exports.getVerseOfTheDay = catchAsync(async (req, res, next) => {
  const votd = await VerseDay.findOne({ order: [['createdAt', 'desc']] });
  return res.json({
    ok: true,
    code: 200,
    status: 'success',
    data: votd,
  });
});
exports.getVerseOfTheDayPause = catchAsync(async (req, res, next) => {
  const lan = req.lan;
  let book = [10, 20, 30, 40, 50, 60][Math.round(Math.random() * 5)];
  let chapter = Math.floor(Math.random() * (10 - 1) + 1);
  let verse = Math.floor(Math.random() * (5 - 1) + 1);
  console.log(book, chapter, verse);
  const query = `SELECT *  FROM 
  verses v inner join books b on b.book_number = v.book_number 
  where v.book_number = ${book} and v.chapter = ${chapter} and v.verse = ${verse}`;
  connect(lan.file).get(query, async (err, row) => {
    if (err) return next(new AppError(err.message, 500));

    console.log(row);
    await VerseDay.create({
      ...row,
      bookName: row.long_name,
      bookNumber: row.book_number,
      version: lan,
    });
    return res.json({
      ok: true,
      code: 200,
      status: 'success',
      data: {
        version: lan,
        verse: row,
      },
    });
  });
});
