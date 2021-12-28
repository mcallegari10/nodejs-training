const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  });
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({ status: 'success', data: { tour: newTour }})
    }
  );
}

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find(tour => tour.id === Number.parseInt(id));
  
  if (tour) {
    return res.status(200).json({
      status: 'success',
      data: { tour }
    })
  }
  
  res.status(404).json({
    status: 'error',
    message: 'Tour not found'
  })
}

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated'
    }
  })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  })
}
