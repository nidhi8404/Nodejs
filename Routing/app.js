const express = require('express');
const cookieParser = require('cookie-parser');
const cookieValidator = require('./cookieValidator'); // Assuming you have this file

const app = express();

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  next();
}

app.use(cookieParser());
app.use(myLogger);
app.use(requestTime);
app.use(validateCookies);

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(3000) /*, () => {
  console.log('Server is running on port 3000');
});  
