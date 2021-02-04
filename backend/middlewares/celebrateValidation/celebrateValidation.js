const { celebrate, Joi } = require('celebrate');
const {
  email, password, link, name, about, avatar, _id, id, cardId, excessObjects,
} = require('./celebrateParametres');

//
module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email, password, name, about, avatar,
  })
    .messages(excessObjects),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({ email, password })
    .messages(excessObjects),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({ name, link })
    .messages(excessObjects),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({ _id })
    .messages(excessObjects),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({ id })
    .messages(excessObjects),
});

module.exports.validateCardLikeId = celebrate({
  params: Joi.object().keys({ cardId })
    .messages(excessObjects),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({ name, about })
    .messages(excessObjects),
});

module.exports.validateAvatar = celebrate({
  body: Joi.object().keys({ avatar })
    .messages(excessObjects),
});
