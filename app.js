const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var spotsRemaining = 165;

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

// render the success page
app.get('/success', function(req, res) {
  res.render('success');
});

// response from home page
app.post('/', function(req, res) {
  // first name - send to mongo
  // last name - send to mongo
  // phone number - send to mongo

  res.redirect('/payment');

});

// response from 'done' button on payment page
app.post('/payment', function(res, req) {
  res.render('success');
});

// listen on local host 3000
app.listen(3000, function() {
  console.log('Server started on port 3000')
});
