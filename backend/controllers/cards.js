const Card = require('../models/card');
const BadRequestError = require('../errors/400_BadRequestError');
const NotFoundError = require('../errors/404_NotFoundError');
const ForbiddenError = require('../errors/403_ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      throw new BadRequestError({ message: `${err.message}` });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError({ message: 'Текущей карточки не существует' });
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError({ message: 'Невозможно удалить данную карточку' });
      }
      return Card.findByIdAndRemove(id);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};
