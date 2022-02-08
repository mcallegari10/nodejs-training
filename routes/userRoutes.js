const express = require('express');

const userCtrl = require('../controllers/userController');
const authCtrl = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

router.route('/')
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

router.route('/:id')
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
