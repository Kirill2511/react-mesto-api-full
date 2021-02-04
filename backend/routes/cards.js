const router = require('express').Router();
const { validateCard, validateCardId, validateCardLikeId } = require('../middlewares/celebrateValidation/celebrateValidation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardLikeId, likeCard);
router.delete('/:cardId/likes', validateCardLikeId, dislikeCard);

module.exports = router;
