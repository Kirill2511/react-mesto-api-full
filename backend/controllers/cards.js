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
    .orFail()
    .then((card) => {
      if (!card) {
        throw new ForbiddenError({ message: 'Недостаточно прав для выполнения операции' });
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError({ message: 'Недостаточно прав для выполнения операции' });
      }
      return Card.findByIdAndRemove(id);
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => {
      throw new NotFoundError({ message: 'Карточка не найдена' });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Карточка не найдена' });
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};
