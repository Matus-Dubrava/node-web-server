const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

// request timestamp logger (middleware)
app.use((req, res, next) => {
  const now = new Date().toString();
  const logMessage = `${now}, ${req.method}, ${req.url}`
  console.log(logMessage);
  fs.appendFile('server.log', logMessage + '\n', err =>
    console.log(`Couldn't write to server.log.`)
  );
  next();
});

// // maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>
  new Date().getFullYear()
);

hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
});

app.listen(3000);
