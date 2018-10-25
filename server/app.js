const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const logger = require('morgan');
const bodyParser = require('body-parser');
const connectHistoryApiFallback = require("connect-history-api-fallback");

const socketIO = require('socket.io');
const http = require('http');

const app = express();
app.use(connectHistoryApiFallback());

const get = '/api/get';
const post = '/api/post';

//import socket constant
const constant = require('./socket_constant/socket_constant');

//import routes
const index = require('./routes/index');
const imap = require('./routes/imap/imap');
const signup = require('./routes/account/signup');
const signin = require('./routes/account/signin');
const get_user = require('./routes/account/get_user');
const update_user = require('./routes/account/update_user');
const channels = require('./routes/account/channels');
const smtp = require('./routes/smtp/smtp');
const test = require('./routes/test');

//link routes
app.use('/test', test);
app.use('/', index);
app.use(post + '/imap', imap);
app.user(post + '/smtp', smtp);
app.use(post + '/signup', signup);
app.use(post + '/update/user', update_user);
app.use(post + '/signin', signin);
app.use(post + '/user', get_user);
app.use(post + '/channels', channels);

//use all modules
mongoose.connect("mongodb://localhost:27017/test");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.set('view engine', 'html');

app.use(function(err, req, res, next) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  //res.render('error'); 
  next(createError(404));
});

const port = 3001;
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', socket => {
  console.log('User connected')

  socket.on(constant.UPDATE_MAILS, (mails) => {
    io.sockets.emit(constant.UPDATE_MAILS, mails);
  })
})
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

/*app.use(function(err, req, res, next) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});*/

module.exports = app;
