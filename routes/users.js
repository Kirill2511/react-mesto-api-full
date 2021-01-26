const router = require('express').Router();
const {
  getAllUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users.js');

router.get('/', getAllUsers);
router.get('/:_id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
