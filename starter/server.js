/* eslint-disable import/newline-after-import */
require('dotenv').config({ path: 'config.env' });
const { default: mongoose } = require('mongoose');
const app = require('./app');
const port = 1000;

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('successful');
  });

app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});
