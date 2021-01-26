const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/400_BadRequestError');
const NotFoundError = require('../errors/404_NotFoundError');
const ConflictError = require('../errors/409_ConflictError');
const { SUCCESS, CLIENT_ERROR } = require('../libs/statusMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError({ message: CLIENT_ERROR.CONFLICT });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        name: user.name, about: user.about, avatar, email: user.email,
      },
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: SUCCESS.AUTHORIZATION });
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: CLIENT_ERROR.USER_NOT_FOUND });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError({ message: CLIENT_ERROR.USER_NOT_FOUND }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      } throw new BadRequestError({ message: `${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError({ message: CLIENT_ERROR.USER_NOT_FOUND }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      } throw new BadRequestError({ message: `${err.message}` });
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};
