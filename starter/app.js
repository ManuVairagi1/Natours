const express = require('express');

const path = require('path');

const app = express();

const Tour = require('./models/tourModel');
const User = require('./models/userModel');

// const { dirname } = require('path');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// app.get('/', (req, res) => {
//   res.status(404).render('base');
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get('/', async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

app.get('/tour/:slug', async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug });

  res.status(200).render('tour', {
    title: 'The forest Hiker',
    tour,
  });
});

//login
app.get('/login', async (req, res) => {
  res.status(200).render('login', {
    title: 'Logged in',
  });
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

module.exports = app;
