var express = require('express');
var simpleParser = require('mailparser').simpleParser;
var router = express.Router();
var Imap = require('imap'), inspect = require('util').inspect;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var fs = require('fs'), fileStream;
const socketIoClient = require('socket.io-client');

const google = {
  id: 'ninanung0503@gmail.com',
  password: '1004nmnm',
}

var imap;

router.get('/imaptest', function(req, res, next) {
  imap = new Imap({
    user: google.id,
    password: google.password,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    connTimeout: 10000, // Default by node-imap 
    authTimeout: 5000, // Default by node-imap, 
    //debug: console.log, // Or your custom function with only one incoming argument. Default: null 
    tlsOptions: { rejectUnauthorized: false },
    mailbox: 'INBOX',
    //searchFilter: ['UNSEEN', 'FLAGGED'], // the search filter being used after an IDLE notification has been retrieved 
    //markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
    mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib. 
    attachments: true, // download attachments as they are encountered to the project directory 
    attachmentOptions: { directory: 'attachments/' } // specify a download directory for attachments 
  });

  var mails = [];

  function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
  }
  imap.once('ready', function () {
    openInbox(function (err, box) {
      if (err) throw err;
      imap.search(['UNSEEN'], function (err, results) {
        if (err) throw err;
        //results 값이 비어있을 경우 fetch를 하면 error를 발생시킴
        var f = imap.fetch(results, { bodies: '', struct: true });    
        f.on('message', function (msg, seqno) {
          var prefix = '(#' + seqno + ') ';
          let mail = {
            date: '',
            from: '',
            name: '',
            to: null,
            cc: null,
            subject: '',
            html: '',
            text: '',
            uid: '',
          }
          msg.on('attributes', function (attrs) {
            console.log(attrs.flags.length);
            mail.uid = attrs.uid;
          });
          msg.on('body', function (stream, info) {
            //console.log(results.length);
            simpleParser(stream, (err, parsed) => {
              if(parsed.html) {
                mail.html = parsed.html.replace(/\\n/gi, '')
              }
              if(parsed.text) {
                mail.text = parsed.text;
              }
              if(parsed.cc) {
                mail.cc = parsed.cc.value;
              }
              if(parsed.from) {
                mail.from = parsed.from.value[0].address;
                mail.name = parsed.from.value[0].name;
              }
              if(parsed.to) {
                mail.to = parsed.to.value;
              }
              if(parsed.subject) {
                mail.subject = parsed.subject;
              }
              if(parsed.date) {
                mail.date = new Date(parsed.date).getTime();
              }
              mails.push(mail);
            })
            //stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.html'));
          });
          msg.on('end', function () {
            console.log(prefix + 'Finished');
          });
        });
        f.once('error', function (err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function () {
          console.log('Done fetching all messages!');
          res.send(mails);
        });
      });
    });
  });

  imap.on('mail', function(num) {
    console.log('mail');
    console.log('new mail : ', num);
    imap.search(['UNSEEN'], function (err, results) {
      var f = imap.fetch(results[results.length - 1], { bodies: '', struct: true });    
      f.on('message', function (msg, seqno) {
        msg.on('body', function (stream, info) {
          simpleParser(stream, (err, parsed) => {
            console.log(parsed.to.value);
            console.log('--------------------------------------------------------------')
          })
        })
      })
    })
  })

  imap.on('update', function(seq, info) {
    console.log('update');
    console.log(seq);
    console.log(info);
  })

  imap.once('error', function (err) {
    console.log(err);
  });

  imap.once('end', function () {
    console.log('end');
  });

  imap.connect();
});

router.get('/', function(req, res, next) {
  function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
  }
  var mails = [];
  imap.once('ready', function () {
    openInbox(function (err, box) {
      if (err) throw err;
      imap.search(['ALL'], function (err, results) {
        if (err) throw err;
        var f = imap.fetch(results, { bodies: '', struct: true });    
        f.on('message', function (msg, seqno) {
          var prefix = '(#' + seqno + ') ';
          let mail = {
            date: '',
            from: '',
            name: '',
            to: null,
            cc: null,
            subject: '',
            html: '',
            text: '',
            uid: '',
          }
          msg.on('attributes', function (attrs) {
            mail.uid = attrs.uid;
          });
          msg.on('body', function (stream, info) {
            simpleParser(stream, (err, parsed) => {
              if(parsed.html) {
                mail.html = parsed.html.replace(/\\n/gi, '')
              }
              if(parsed.text) {
                mail.text = parsed.text;
              }
              if(parsed.cc) {
                mail.cc = parsed.cc.value;
              }
              if(parsed.from) {
                mail.from = parsed.from.value[0].address;
                mail.name = parsed.from.value[0].name;
              }
              if(parsed.to) {
                mail.to = parsed.to.value;
              }
              if(parsed.subject) {
                mail.subject = parsed.subject;
              }
              if(parsed.date) {
                mail.date = new Date(parsed.date).getTime();
              }
              mails.push(mail);
            })
          });
          msg.on('end', function () {
            console.log(prefix + 'Finished');
          });
        });
        f.once('error', function (err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function () {
          console.log('Done fetching all messages!');
          res.send(mails);
        });
      });
    });
  });
  imap.connect();
})

router.post('/socket', jsonParser, function(req, res, next) {
  console.log('socket');
  const socket = socketIoClient('http://localhost:3001');
  socket.emit('change color', 'test') // change 'red' to this.state.color
  res.send(true);
})

module.exports = router;
