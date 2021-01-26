const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/celebrateValidation/celebrateValidation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:_id', validateId, deleteCard);
router.put('/:_id/likes', validateId, likeCard);
router.delete('/:_id/likes', validateId, dislikeCard);

module.exports = router;
