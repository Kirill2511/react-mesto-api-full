const { Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const {
  string, empty, min, max, required, emailMessage, uri, excess, alphanum, length, hex,
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
  .required()
  .uri()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.uri': uri,
    'any.required': required,
  });

module.exports.avatar = Joi
  .string()
  .required()
  .custom(uriCustomScheme)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.custom': uri,
    'any.required': required,
  });

module.exports.name = Joi
  .string()
  .required()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
    'any.required': required,
  });

module.exports.about = Joi
  .string()
  .required()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
    'any.required': required,
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
    'string.hex': hex,
    'any.required': required,
  });

module.exports.excessObjects = {
  'object.unknown': excess,
};
