const router = require('express').Router();
const { validateUserUpdate, validateAvatar, validateId } = require('../middlewares/celebrateValidation/celebrateValidation');
const {
  getAllUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users.js');

router.get('/', getAllUsers);
router.get('/:_id', validateId, getUser);
router.patch('/me', validateUserUpdate, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
