const express = require('express');

const userCtrl = require('../controllers/userController');
const authCtrl = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

router.post('/forgotPassword', authCtrl.forgotPassword);
router.patch('/resetPassword/:token', authCtrl.resetPassword);
router.patch('/updatePassword', authCtrl.updatePassword);

router.patch('/updateMe', authCtrl.protect, userCtrl.udpateMe);
router.delete('/deleteMe', authCtrl.protect, userCtrl.deleteMe);

router.route('/')
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

router.route('/:id')
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
