const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401_UnauthorizedError');
const { CLIENT_ERROR } = require('../libs/statusMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new UnauthorizedError({ message: CLIENT_ERROR.FORBIDDEN });
  }
  req.user = payload;

  next();
};
