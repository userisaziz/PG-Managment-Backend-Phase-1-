// CustomError.js
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequest extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class NotFound extends CustomError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

module.exports = {
  CustomError,
  BadRequest,
  NotFound,
};
