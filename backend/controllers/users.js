const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/400_BadRequestError');
const NotFoundError = require('../errors/404_NotFoundError');
const ConflictError = require('../errors/409_ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError({ message: 'Неправильная почта или пароль' });
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError({ message: 'Пользователь с таким email уже зарегистрирован' });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        _id: user._id, email: user.email,
      },
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        ),
      });
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id).select('+password')
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => {
      throw new NotFoundError({ message: 'Пользователь не найден' });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true })
    .orFail(() => new NotFoundError({ message: 'Пользователь не найден' }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      } throw new BadRequestError({ message: `${err.message}` });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError({ message: 'Пользователь не найден' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      } throw new BadRequestError({ message: `${err.message}` });
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};
