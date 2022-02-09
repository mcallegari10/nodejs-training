const express = require('express');

const tourCtrl = require('../controllers/tourController');
const authCtrl = require('../controllers/authController');

const router = express.Router();

// router.param('id', tourCtrl.checkId)

router.route('/top-5-cheap')
  .get(tourCtrl.aliasTopTours, tourCtrl.getAllTours);

router.route('/tour-stats')
  .get(tourCtrl.getTourStats);

router.route('/monthly-plan/:year')
  .get(tourCtrl.getMonthlyPlan);

router.route('/')
  .get(authCtrl.protect, tourCtrl.getAllTours)
  .post(tourCtrl.createTour);

router.route('/:id')
  .get(tourCtrl.getTour)
  .patch(tourCtrl.updateTour)
  .delete(authCtrl.protect, authCtrl.restrictTo('admin'), tourCtrl.deleteTour);

module.exports = router;
