const express = require('express');

const tourCtrl = require('../controllers/tourController');
const router = express.Router();

// router.param('id', tourCtrl.checkId)

router.route('/top-5-cheap')
  .get(tourCtrl.aliasTopTours, tourCtrl.getAllTours);

router.route('/')
  .get(tourCtrl.getAllTours)
  .post(tourCtrl.createTour);

router.route('/:id')
  .get(tourCtrl.getTour)
  .patch(tourCtrl.updateTour)
  .delete(tourCtrl.deleteTour);

module.exports = router;
