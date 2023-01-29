const { versions } = require('../db');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

exports.ValidatelanguageAndVersion = catchAsync(async (req, res, next) => {
  const { language, version } = req.query;
  console.log(language, version);

  if (!language) return next(new AppError('Parameter language : required', 400));
  console.log('2');

  let lan = versions().find((v) => v.language === language);
  console.log('3');

  if (!lan) return next(new AppError('This language does not exist !', 400));
  console.log('4');

  if (version) {
    console.log('5');

    lan = versions().find((v) => v.language === language && v.name === version);
    console.log('6');

    if (!lan) return next(new AppError('We do not have this version for this language', 400));
    console.log('7');
  }
  console.log('8');

  next();
  console.log('9');

  return lan;
});
