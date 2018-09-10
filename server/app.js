var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

const get = '/api/get';
const post = '/api/post';

var imap = require('./routes/imap');
var signup = require('./routes/account/signup');
var signin = require('./routes/account/signin');
var get_user = require('./routes/account/get_user');
var update_user = require('./routes/account/update_user');
var get_all_email_by_address = require('./routes/get_email/get_all_email_by_address');
var get_email_by_address = require('./routes/get_email/get_email_by_address');
var get_email_unseen = require('./routes/get_email/get_email_unseen');
var get_sent_email_by_address = require('./routes/get_email/get_sent_email_by_address');

app.use('/imap', imap);
app.use(post + '/signup', signup);
app.use(post + '/update/user', update_user);
app.use(get + '/signin', signin);
app.use(get + '/user', get_user);
app.use(get + '/email/:address', get_email_by_address);
app.use(get + '/email/all/:address', get_all_email_by_address);
app.use(get + '/email/unseen', get_email_unseen);
app.use(get + '/email/sent/:address', get_sent_email_by_address);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'html');

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
