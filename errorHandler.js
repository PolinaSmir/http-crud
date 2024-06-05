const DataBaseError = require("./errors/DataBaseError");
const { ValidationError } = require("yup");
const NotFoundError = require("./errors/NotFoundError");

module.exports.basicErrorHandler = (err, req, res, next) => {
  if (err instanceof DataBaseError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof TypeError) {
    return res.status(400).send("Thing does not exist");
  }

  if (err instanceof RangeError) {
    return res.status(401).send("There is no one things");
  }

  if (err instanceof ValidationError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
};
