const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// connect to database - remember to go to Heroku and add config vars
mongoose.connect("mongodb+srv://admin-kyra:2000@cluster0.bjc7w.mongodb.net/rsvpDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// create new mongoose schema for attendee data
const attendeeSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  phone: String
});

// create new model
const Attendee = mongoose.model('Attendee', attendeeSchema);

var spotsRemaining = 57;  // removing myself and Kyra (DJ GOODAZ)

// render home page
app.get('/', function(req, res) {
  if (spotsRemaining == 0) {
    res.redirect('/sold-out');
  }
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

// render the sold out page
app.get('/sold-out', function(req, res) {
  res.render('sold-out')
});

// response from home page - add attendee to database
app.post('/', function(req, res) {
  const attendee = new Attendee ({
    fName: req.body.fName,
    lName: req.body.lName,
    phone: req.body.phone
  });

  attendee.save();

  // update the spots remaining
  Attendee.count().then((count) => {
    spotsRemaining = 163 - count;
  });

  res.redirect('/payment');
});

// response from 'done' button on payment page
app.post('/payment', function(res, req) {
  res.render('success');
});

// listen on local host 3000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log('Server started successfully');
});

// HEROKU LINK
// https://hidden-stream-18897.herokuapp.com/
