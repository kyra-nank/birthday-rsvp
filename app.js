const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const spotsRemaining = 165;

// home page
app.get('/', function(req, res) {
  res.render('rsvp', {spotsRemaining: spotsRemaining});
});
