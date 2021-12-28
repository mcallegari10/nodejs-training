const express = require('express');

const tourCtrl = require('../controllers/tourController');
const router = express.Router();

router.param('id', tourCtrl.checkId)

router.route('/')
  .get(tourCtrl.getAllTours)
  .post(tourCtrl.checkBody, tourCtrl.createTour);

router.route('/:id')
  .get(tourCtrl.getTour)
  .patch(tourCtrl.updateTour)
  .delete(tourCtrl.deleteTour);

module.exports = router;
