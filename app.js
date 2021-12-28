const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  });
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({ status: 'success', data: { tour: newTour }})
    }
  );
}

const getTour = (req, res) => {
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

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated'
    }
  })
}

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  })
}

app.route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.use((req, res, next) => {
  console.log('Hello from middleware!');
  next();
});


app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(3000, () => {
  console.log('Running on port 3000');
})
