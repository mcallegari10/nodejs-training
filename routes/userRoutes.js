const express = require('express');

const userCtrl = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

router.route('/:id')
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
