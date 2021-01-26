const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .catch((err) => res.status(400).send({ message: `${err.message}` }))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail()
    .catch(() => {
      throw new Error(res.status(404).send({ message: 'Карточка не найдена' }));
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Error(res.status(403).send({ message: 'Недостаточно прав для выполнения операции' }));
      }
      Card.findByIdAndDelete(req.params._id)
        .then(() => res.send({ message: 'Пост успешно удален' }))
        .catch(next);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .catch(() => {
      throw new Error(res.status(404).send({ message: 'Карточка не найдена' }));
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .catch(() => {
      throw new Error(res.status(404).send({ message: 'Карточка не найдена' }));
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};
