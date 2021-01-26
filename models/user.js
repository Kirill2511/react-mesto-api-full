const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UnauthorizedError = require('../errors/401_UnauthorizedError');

const { CLIENT_ERROR } = require('../libs/statusMessages');

const { requiredTrue, min, max } = require('../libs/validationParameters');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: min(2),
    maxlength: max(30),
    required: requiredTrue,
  },
  about: {
    type: String,
    minlength: min(2),
    maxlength: max(30),
    required: requiredTrue,
  },
  avatar: {
    type: String,
    required: requiredTrue,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: min(8),
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(res, req, email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError({ message: CLIENT_ERROR.AUTHENTICATION });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError({ message: CLIENT_ERROR.AUTHENTICATION });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
