const express = require('express');
const simpleParser = require('mailparser').simpleParser;
const router = express.Router();
const Imap = require('imap'), inspect = require('util').inspect;
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const socketIoClient = require('socket.io-client');

const constant = require('../../socket_constant/socket_constant');

const google = {
  id: 'ninanung0503@gmail.com',
  password: '1004nmnm',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
}

let imap;
let isNewEmail = false;

router.post('/', jsonParser, function(req, res, next) {
    const user = req.body.imap_info;

    imap = new Imap({
        user: google.id, //user.imap_id,
        password: google.password, //user.imap_password,
        host: google.host, //user.imap_host,
        port: google.port, //user.imap_port,
        tls: google.tls, //user.imap_tls,
        connTimeout: 10000, // Default by node-imap 
        authTimeout: 10000, // Default by node-imap, 
        keepalive: true,
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

    imap.once('ready', function () {
        let send = {
            error: '',
            mails: [],
        }
        imap.openBox('INBOX', false, function (err, box) {
            if (err) throw err;
            console.log('box open');
            isNewEmail = false;
            imap.search(['ALL'], function (err, results) {
                if (err) throw err;
                if(results) {
                    const f = imap.fetch(results, { bodies: '', struct: true });    
                    f.on('message', function (msg, seqno) {
                        let mail = {
                            date: '',
                            from: '',
                            name: '',
                            to: [],
                            cc: [],
                            subject: '',
                            html: '',
                            text: '',
                            uid: '',
                            flags: [],
                        }
                        msg.on('attributes', function (attrs) {
                            mail.uid = attrs.uid;
                            mail.flags = attrs.flags;
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
                                send.mails.push(mail);
                                if(results.length === send.mails.length) {
                                    res.send(send);
                                }
                            })
                        });
                        msg.on('end', function () {});
                    });
                    f.once('error', function (err) {
                        console.log('Fetch error: ' + err);
                    });
                    f.once('end', function () {
                        console.log('Done fetching all messages!');
                    });
                }
            });
        });
    });

    imap.on('mail', function(num) {
        console.log('new mail : ', num);
        isNewEmail = true;
        imap.search(['UNSEEN'], function (err, results) {
            if(err) {
                console.log(err)
                throw err;
            }
            if(results && isNewEmail) {
                let newMails = [];
                const resLength = results.length - 1;
                for(let i = resLength; i > resLength - num; i--) {
                    newMails.push(results[i]);
                }
                const f = imap.fetch(newMails, { bodies: '', struct: true });
                let mails = [];  
                f.on('message', function (msg, seqno) {
                    let mail = {
                        date: '',
                        from: '',
                        name: '',
                        to: [],
                        cc: [],
                        subject: '',
                        html: '',
                        text: '',
                        uid: '',
                        flags: [],
                    }
                    msg.on('attributes', function (attrs) {
                        mail.uid = attrs.uid;
                        mail.flags = attrs.flags;
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
                            if(newMails.length === mails.length) {
                                //send mails to server side socket
                                const socket = socketIoClient(constant.SERVER_URL);
                                socket.emit(constant.UPDATE_MAILS, mails)
                            }
                        })
                    });
                    msg.on('end', function () {});
                });
                f.once('error', function (err) {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', function () {
                    console.log('Done fetching all messages!');
                });
            }
        })
    })

    imap.on('update', function(seq, info) {
        console.log('update');
        console.log(seq);
        console.log(info);
    })

    imap.once('error', function(err) {
        console.log(err);
    });

    imap.once('end', function() {
        const date = new Date();
        const time = date.getTime();
        console.log('imap connect end (not with signout) : ' + new Date(time));
    });

    imap.connect();
});

router.post('/disconnect', jsonParser, function(req, res, next) {
    const user = req.body.imap_info;

    imap.once('error', function(err) {
        console.log(err);
        res.send(false);
    });

    imap.once('end', function() {
        const date = new Date();
        const time = date.getTime();
        console.log('imap connect end : ' + new Date(time));
        res.send(true);
    });

    imap.end()
});

router.post('/mark/seen', jsonParser, function(req, res, next) {
    let send = {
        error: '',
        mail: null,
    }
    const uid = req.body.uid;
    const f = imap.fetch(uid, { bodies: '', struct: true, markSeen: true });
    f.on('message', function (msg, seqno) {
        let mail = {
            uid: '',
            flags: [],
        }
        msg.on('attributes', function (attrs) {
            mail.uid = attrs.uid;
            mail.flags = attrs.flags;
        });
        msg.on('end', function () {
            send.mail = mail;
            res.send(send);
        });
    });
    f.once('error', function (err) {
        console.log('Fetch error: ' + err);
        send.error = err;
        res.send(send);
    });
    f.once('end', function () {
        console.log('Done fetching all messages!');
    });
});

module.exports = router;