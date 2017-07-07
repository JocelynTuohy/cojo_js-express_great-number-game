const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.use(session({secret: 'becomeintrinsictothewiderdialect '}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if (req.session.number_answer === undefined){
    req.session.number_answer = Math.floor(Math.random() * 101);
  }
  res.render('index', {result: req.session.result,
    number_answer: req.session.number_answer});
})
app.post('/guess', function(req, res) {
  // console.log('POST DATA', req.body);
  // req.session.thing = req.body.thing;
  let guess = req.body.guess;
  console.log(guess);
  if (guess == req.session.number_answer){
    console.log('correct');
    req.session.result = 'correct';
  }else if (guess > req.session.number_answer){
    console.log('high');
    req.session.result = 'high';
  }else if (guess < req.session.number_answer){
    console.log('low');
    req.session.result = 'low';
  }
  res.redirect('/');
})
app.get('/reset', function(req, res) {
  req.session.destroy();
  res.redirect('/');
})

app.listen(8000, function() {
  console.log('listening on port 8000');
});
