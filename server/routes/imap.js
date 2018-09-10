var express = require('express');
var simpleParser = require('mailparser').simpleParser;
var router = express.Router();
var Imap = require('imap'), inspect = require('util').inspect;
var fs = require('fs'), fileStream;

const google = {
  id: 'ninanung0503@gmail.com',
  password: '1004nmnm',
}

var imap = new Imap({
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

router.get('/', function(req, res, next) {
  var buffer = '';
  var myMap;
  
  function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
  }

  imap.once('ready', function () {
    openInbox(function (err, box) {
      if (err) throw err;
      imap.search(['UNSEEN'], function (err, results) {
        if (err) throw err;
        //results 값이 비어있을 경우 fetch를 하면 error를 발생시킴
        var f = imap.fetch(results[results.length - 1], { bodies: '', struct: true });    
        f.on('message', function (msg, seqno) {
          //console.log('Message #%d' + seqno);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function (stream, info) {
            console.log(results.length);
            simpleParser(stream, (err, parsed) => {
              const html = parsed.html.replace(/\\n/gi, '')
              const from = parsed.from.value[0].address
              const cc = parsed.cc.value[0].address;
              console.log(cc);
              console.log('--------------------------------------------------------------')
            })
            //stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.html'));
          });
          msg.once('attributes', function (attrs) {
            //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
          });
          msg.once('end', function () {
            console.log(prefix + 'Finished');
          });
        });
        f.once('error', function (err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function () {
          console.log('Done fetching all messages!');
        });
      });
    });
  });

  /*imap.on('mail', function(num) {
    console.log('mail')
    openInbox(function(err, box) {
      if(err) throw err;
      imap.search(['UNSEEN'], function (err, results) {
        var f = imap.fetch(results[results.length - 1], { bodies: '', struct: true });    
        f.on('message', function (msg, seqno) {
          msg.on('body', function (stream, info) {
            simpleParser(stream, (err, parsed) => {
              console.log(parsed);
              console.log('--------------------------------------------------------------')
            })
          })
        })
      })
    })
  })*/

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

router.get('/test', function(req, res, next) {
  console.log('test');
});

module.exports = router;
