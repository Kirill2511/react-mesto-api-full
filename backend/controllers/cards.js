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
  Card.findById(req.params.id)
    .orFail(new NotFoundError({ message: 'Карточки не существует' }))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: 'Невозможно удалить чужую карточку' });
      }
      card.remove()
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return NotFoundError({ message: 'Карточка с таким id не найдена' });
      }
      if (err.message === 'ForbiddenError') {
        return ForbiddenError({ message: 'Недостаточно прав' });
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError({ message: `Не существует карточки с id ${req.params.cardId}` });
      }
      return res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { runValidators: true, new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError({ message: `Не существует карточки с id ${req.params.cardId}` });
      }
      return res.status(200).send({ data: card });
    })
    .catch(next);
};
