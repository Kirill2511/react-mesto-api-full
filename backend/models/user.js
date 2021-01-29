const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UnauthorizedError = require('../errors/401_UnauthorizedError');

const { requiredTrue, min, max } = require('../libs/validationParameters');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: min(2),
    maxlength: max(30),
    required: requiredTrue,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: min(2),
    maxlength: max(30),
    require: requiredTrue,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    require: requiredTrue,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Не верный формат почты',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Не верный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: min(8),
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError({ message: 'Неправильные почта или пароль' }));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError({ message: 'Неправильные почта или пароль' }));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
