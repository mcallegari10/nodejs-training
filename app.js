const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// GLOBAL MIDDLEWARES
// Security headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit http calls
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP'
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization for XSS
app.use(xss());

// Prevent parameter pollution
// Have to whitelist params that can be passed multiple times
app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Unable to find ${req.originalUrl}`));
});

app.use(globalErrorHandler);

module.exports = app;
