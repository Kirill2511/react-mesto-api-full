const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401_UnauthorizedError');
const { CLIENT_ERROR } = require('../libs/statusMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return UnauthorizedError(res);
  }

  const token = extractBearerToken(authorization);

  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new UnauthorizedError({ message: CLIENT_ERROR.FORBIDDEN });
  }
  req.user = payload;

  next();
};
