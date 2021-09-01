const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const spotsRemaining = 165;

// render home page
app.get('/', function(req, res) {
  res.render('rsvp', {spotsRemaining: spotsRemaining});
});

// render the payment page
app.get('/payment', function(req, res) {
  res.render('payment');
});

// render the details page
app.get('/details', function(req, res) {
  res.render('details');
});

// response from home page
app.post('/', function(req, res) {
  // first name - req
  // last name - req
  // phone number - req
  // party code - req, validate that it equals another value
  // checkbox - req

  // info received w/o issues, res.redirect('payment')
});

// response from 'done' button on payment page
app.post('/payment', function(res, req) {
  fName = 'Name from DB'
  res.render('success', {fName: fName});
});

// listen on local host 3000
app.listen(3000, function() {
  console.log('Server started on port 3000')
});
