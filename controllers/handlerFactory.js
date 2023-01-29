const AppError = require('../helpers/AppError');
const catchAsync = require('../helpers/catchAsync');
const APIFeatures = require('../helpers/ApiFeatures');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      ok: true,
      data: {
        data: doc,
      },
    });
  });
exports.createNultiples = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      await Model.create(req.body[i]);
    }

    res.status(201).json({
      status: 'success',
      ok: true,
      message: 'Registros insertados con exito !',
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //a little hack
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    //API Features
    const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();

    //execute the query
    // const docs = await features.query.explain();
    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      ok: true,
      results: docs.length,
      data: { data: docs },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    doc = await query;

    if (!doc) {
      return next(new AppError('No document with that ID ', 404));
    }

    res.status(200).json({
      status: 'success',
      ok: true,
      data: { data: doc },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document with that ID ', 404));
    }

    res.status(200).json({
      status: 'success',
      ok: true,
      data: { data: doc },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No doc with that ID ', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
      ok: true,
    });
  });
