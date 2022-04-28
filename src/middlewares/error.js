import { FXValidationError } from 'express-fastest-validator'

export const createError = (req, res, next) => {
  const error = (statusCode, message) => {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
  }

  res.error = req.error = error

  next()
}

export const errorHandler = (error, req, res, next) => {
  /*
   * FXValidationError will be raised by express-fastest-validator if the request is invalid.
   * FXValidationError.description is an array describing validation errors.
   */
  if (error instanceof FXValidationError) {
    return res
      .status(400)
      .json({ error: error.description })
  }

  if (!error.statusCode) error.statusCode = 500

  return res
    .status(error.statusCode)
    .json({ error: error.toString() })
}
