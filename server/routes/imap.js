var express = require('express');
var router = express.Router();
var Imap = require('imap'), inspect = require('util').inspect;
var fs = require('fs'), fileStream;

const google = {
  id: 'ninanung0503@gmail.com',
  password: '1004nmnm',
}

const naver = {
  id: 'ninanung',
  password: '1004Nmnm!',
}

router.get('/', function(req, res, next) {
  var buffer = '';
  var myMap;

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
    mailbox: 'INBOX', // mailbox to monitor 
    searchFilter: ['UNSEEN', 'FLAGGED'], // the search filter being used after an IDLE notification has been retrieved 
    markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
    mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib. 
    attachments: true, // download attachments as they are encountered to the project directory 
    attachmentOptions: { directory: 'attachments/' } // specify a download directory for attachments 
  });
  
  function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
  }

  imap.once('ready', function () {
    imap.getBoxes('', function(error, boxes) {
      console.log(boxes);
    })
    openInbox(function (err, box) {
      if (err) throw err;
      imap.search(['SEEN'], function (err, results) {
        if (err) throw err;
        //results 값이 비어있을 경우 fetch를 하면 error를 발생시킴
        var f = imap.fetch(results, { bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)', struct: true });
        f.on('message', function (msg, seqno) {
          //console.log('Message #%d' + seqno);
          console.log('Message type' + msg.text);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function (stream, info) {
            stream.on('data', function (chunk) {
              buffer += chunk.toString('utf8');
              //console.log('BUFFER' + buffer)
            })
            stream.once('end', function () {
              if (info.which === '1') {
                //console.log('BUFFER' + buffer)
              }
              console.log(inspect(Imap.parseHeader(buffer)))
            });
            //console.log(prefix + 'Body');
            //stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.html'));
          });
          msg.once('attributes', function (attrs) {
            console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
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
          imap.end();
        });
      });
    });
  });
  
  imap.once('error', function (err) {
    console.log(err);
  });
  
  imap.connect(); 
});

router.get('/inbox', function(req, res, next) {
  var inbox = require("inbox");
 
  var client = inbox.createConnection(false, "imap.gmail.com", {
      secureConnection: true,
      auth:{
          user: "ninanung0503@gmail.com",
          pass: "1004nmnm"
      }
  });
   
  client.connect();
   
  client.on("connect", function(){
      client.openMailbox("INBOX", function(error, info){
          if(error) throw error;
   
          client.listMessages(-10, function(err, messages){
              messages.forEach(function(message){
                console.log(message);
              });
          });
      });
  });
});

router.get('/imap', function(req, res, next) {
  var MailListener = require("mail-listener4");
 
  var mailListener = new MailListener({
    username: google.id,
    password: google.password,
    host: 'imap.gmail.com',
    port: 993, // imap port
    tls: true,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap,
    //debug: console.log, // Or your custom function with only one incoming argument. Default: null
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX", // mailbox to monitor
    searchFilter: ["ALL"], // the search filter being used after an IDLE notification has been retrieved
    markSeen: true, // all fetched email willbe marked as seen and not fetched next time
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    attachments: true, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
  });
   
  mailListener.start(); // start listening
   
  // stop listening
  //mailListener.stop();
   
  mailListener.on("server:connected", function(){
    console.log("imapConnected");
  });
   
  mailListener.on("mailbox", function(mailbox){
    console.log("Total number of mails: ", mailbox.messages.total); // this field in mailbox gives the total number of emails
  });
   
  mailListener.on("server:disconnected", function(){
    console.log("imapDisconnected");
  });
   
  mailListener.on("error", function(err){
    console.log(err);
  });
   
  mailListener.on("mail", function(mail, seqno, attributes){
    // do something with mail object including attachments
    console.log(mail.eml);
    console.log('--------------------------------------------------------------')
    // mail processing code goes here
  });
   
  mailListener.on("attachment", function(attachment){
    console.log(attachment.path);
  });
})

module.exports = router;
