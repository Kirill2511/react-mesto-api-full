const mongoose = require('mongoose');
const validator = require('validator');

const { requiredTrue, min, max } = require('../libs/validationParameters');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: min(2),
    maxlength: max(30),
    required: requiredTrue,
  },
  link: {
    type: String,
    required: requiredTrue,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: requiredTrue,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
