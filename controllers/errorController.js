const AppError = require('../helpers/AppError')

const handleSequelizeValidationError = (error) => new AppError(error.errors.map((e) => e.message).join(',,'), 400)
const handleSequelizeForeignKeyConstraintError = (error) => new AppError(`There is a problem with the foreign key(s) (${error.fields?.join(',')}) in table ${error?.table}. Make sure you submit the data correctly.`, 400)
const handleSequelizeUniqueConstraintError = (error) => new AppError(error.errors.map((e) => e.message).join(',,'), 400)
const handleJsonWebTokenError = () => new AppError('Invalid token. Sign in again.', 401)
const handleJWTExpiredToken = () => new AppError('Your token has expired. Please login again.', 401)
const handleSequelizeAccessDeniedError = () => new AppError('Error trying to connect to the database. Verify that all connection data is correct.', 401)

const sendError = (err, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(err.statusCode).json({
      ok: false,
      status: err.status,
      message: err.message.split(',,')[0],
      errors: err.message.split(',,'),
      error: { ...err, message: err.message },
      stack: err.stack
    })
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      ok: false,
      status: err.status,
      message: err.message.split(',,')[0],
      errors: err.message.split(',,'),
      code: err.statusCode
    })
  }

  return res.status(500).json({ ok: false, status: 'error', code: 500, message: 'Something went wrong!! Please try again.' })
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  let error = Object.assign(err)
  // console.log(error);
  if (error.name === 'SequelizeAccessDeniedError') error = handleSequelizeAccessDeniedError()
  if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError()
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredToken()
  if (error.name === 'SequelizeValidationError') error = handleSequelizeValidationError(error)
  if (error.name === 'SequelizeUniqueConstraintError') error = handleSequelizeUniqueConstraintError(error)
  if (error.name === 'SequelizeForeignKeyConstraintError') error = handleSequelizeForeignKeyConstraintError(error)

  sendError(error, res)
}
