const { Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const {
  string, empty, min, max, required, emailMessage, uri, excess, alphanum, length,
} = require('../../libs/joiMessages');

const uriCustomScheme = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(uri);
  }
  return value;
};

module.exports.email = Joi
  .string()
  .required()
  .email()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.email': emailMessage,
    'any.required': required,
  });

module.exports.password = Joi
  .string()
  .required()
  .min(8)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'any.required': required,
  });

module.exports.link = Joi
  .string()
  .custom(uriCustomScheme)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.custom': uri,
  });

module.exports.avatar = Joi
  .string()
  .custom(uriCustomScheme)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.custom': uri,
  });

module.exports.name = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.about = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports._id = Joi
  .string()
  .alphanum()
  .length(24)
  .hex()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.alphanum': alphanum,
    'string.length': length,
  });

module.exports.id = Joi
  .string()
  .alphanum()
  .length(24)
  .hex()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.alphanum': alphanum,
    'string.length': length,
  });

module.exports.cardId = Joi
  .string()
  .alphanum()
  .length(24)
  .hex()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.alphanum': alphanum,
    'string.length': length,
  });

module.exports.excessObjects = {
  'object.unknown': excess,
};
