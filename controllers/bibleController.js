const { connect, versions } = require('../db');
const AppError = require('../helpers/AppError');
const catchAsync = require('../helpers/catchAsync');
const { ValidatelanguageAndVersion } = require('../helpers/util');

exports.allVersion = catchAsync(async (req, res, next) => {
  return res.json({
    ok: true,
    results: versions().length,
    versions: versions(),
  });
});

exports.allBooks = catchAsync(async (req, res, next) => {
  // const lan = ValidatelanguageAndVersion(req, res);
  const { language, version } = req.query;
  if (!language) return next(new AppError('Parameter language : required', 400));
  let lan = versions().find((v) => v.language === language);
  if (!lan) return next(new AppError('This language does not exist !', 400));
  if (version) {
    lan = versions().find((v) => v.language === language && v.name === version);
    if (!lan) return next(new AppError('We do not have this version for this language', 400));
  }
  connect(lan.file).all(
    `
    SELECT books.book_number, short_name, long_name ,count(distinct chapter) as chapters, count(verse) as verses
    FROM books 
    inner JOIN verses 
    on books.book_number = verses.book_number
    GROUP by books.book_number, short_name, long_name
  `,
    (err, rows) => {
      if (err) return next(new AppError(err.message, 500));
      return res.json({ ok: true, results: rows.length, code: 200, version: lan, books: rows });
    }
  );
});
exports.versesChapterOfBook = (req, res) => {
  const { language, version } = req.query;
  if (!language) return next(new AppError('Parameter language : required', 400));
  let lan = versions().find((v) => v.language === language);
  if (!lan) return next(new AppError('This language does not exist !', 400));
  if (version) {
    lan = versions().find((v) => v.language === language && v.name === version);
    if (!lan) return next(new AppError('We do not have this version for this language', 400));
  }
  const { bookNumber, chapter } = req.params;
  connect(lan.file).all(
    `
    SELECT *
    FROM verses v
    WHERE v.book_number = ${bookNumber} and v.chapter = ${chapter}
    `,
    (err, rows) => {
      if (err) return res.json({ ok: false, status: false, code: 401, err, message: err.message });
      return res.json({ ok: true, results: rows.length, status: true, code: 200, version: lan, verses: rows });
    }
  );
};

exports.searchByBookChapter_Verse = (req, res) => {
  const { language, version } = req.query;
  if (!language) return next(new AppError('Parameter language : required', 400));
  let lan = versions().find((v) => v.language === language);
  if (!lan) return next(new AppError('This language does not exist !', 400));
  if (version) {
    lan = versions().find((v) => v.language === language && v.name === version);
    if (!lan) return next(new AppError('We do not have this version for this language', 400));
  }
  const { search } = req.query;
  let v = search.split('.');
  let verses;
  let book = v[0];
  let chapter = v[1];
  // verses = v[2];
  // if(verses.length > 0){}
  // console.log(verses);

  // return;
  connect(lan.file).all(
    `
    SELECT *
    FROM verses v
    WHERE v.short_name = ${book} and v.chapter = ${chapter}
    `,
    (err, rows) => {
      if (err) return res.json({ ok: false, status: false, code: 401, err, message: err.message });
      return res.json({ ok: true, results: rows.length, status: true, code: 200, version: lan, verses: rows });
    }
  );
};

exports.searchByWordsSentences = (req, res) => {
  const { language, version } = req.query;
  if (!language) return next(new AppError('Parameter language : required', 400));
  let lan = versions().find((v) => v.language === language);
  if (!lan) return next(new AppError('This language does not exist !', 400));
  if (version) {
    lan = versions().find((v) => v.language === language && v.name === version);
    if (!lan) return next(new AppError('We do not have this version for this language', 400));
  }
  const { search, limit } = req.query;
  console.log(limit);

  connect(lan.file).all(
    `
    SELECT *
    FROM verses v
    WHERE v.text LIKE '%${search}%' 
    limit 50
    `,
    (err, rows) => {
      if (err) return res.json({ ok: false, status: false, code: 401, err, message: err.message });
      return res.json({ ok: true, results: rows.length, status: true, code: 200, version: lan, books: rows });
    }
  );
};

exports.getRandomVerse = (req, res) => {
  const { language, version } = req.query;
  if (!language) return next(new AppError('Parameter language : required', 400));
  let lan = versions().find((v) => v.language === language);
  if (!lan) return next(new AppError('This language does not exist !', 400));
  if (version) {
    lan = versions().find((v) => v.language === language && v.name === version);
    if (!lan) return next(new AppError('We do not have this version for this language', 400));
  }
  const { bookNumber, chapter } = req.params;
  connect(lan.file).all(
    `
    SELECT *
    FROM verses v
    WHERE v.text LIKE ${search} 
    `,
    (err, rows) => {
      if (err) return res.json({ ok: false, status: false, code: 401, err, message: err.message });
      return res.json({ ok: true, results: rows.length, status: true, code: 200, version: lan, books: rows });
    }
  );
};
