function errorHandler(err, req, res, next) {
  console.log(err.name);
  let status = 500;
  let message = err.message;

  if (err.name === "Email or password is incorrect") {
    message = err.name;
    status = 401;
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    message = "Username or email already in use.";
    status = 400;
  }

  if (err.name === "SequelizeValidationError") {
    message = "Username, email and password must all be provided";
    status = 400;
  }

  res.status(status).json({ status, message });
}

module.exports = { errorHandler };
