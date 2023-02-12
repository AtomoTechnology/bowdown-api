const AppError = require('../helpers/AppError');
const catchAsync = require('../helpers/catchAsync');
const User = require('./../schemas/user');
const factory = require('./factoryController');
const FavouriteVerse = require('../schemas/favouriteVerse');

exports.getUser = factory.findOne(User, { include: [{ model: FavouriteVerse }] });
exports.getAllUsers = factory.all(User);
exports.updateUser = factory.update(User, ['username', 'email', 'photo', 'active', 'role']);
exports.deleteUser = factory.destroy(User);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.GetMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route is not for password update. Please use /updateMyPassword', 400));

  const filterBody = filterObj(req.body, 'username', 'email', 'photo');
  const updatedUser = await User.update(filterBody, { where: { id: req.user.id } });

  res.status(200).json({
    status: 'success',
    ok: true,
    code: 200,
    data: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.update({ active: false }, { where: { id: req.user.id } });

  res.status(200).json({
    status: 'success',
    ok: true,
    code: 200,
    data: null,
  });
});
