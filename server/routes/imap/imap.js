var express = require('express');
var simpleParser = require('mailparser').simpleParser;
var router = express.Router();
var Imap = require('imap'), inspect = require('util').inspect;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var fs = require('fs'), fileStream;

var User = require('../../models/users');

const google = {
  id: 'ninanung0503@gmail.com',
  password: '1004nmnm',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
}

var imap;

router.get('/', jsonParser, function(req, res, next) {
    //var user = req.body;

    imap = new Imap({
        user: google.id, //user.imap_id,
        password: google.password, //user.imap_password,
        host: google.host, //user.imap_host,
        port: google.port, //user.imap_port,
        tls: google.tls, //user.imap_tls,
        connTimeout: 10000, // Default by node-imap 
        authTimeout: 10000, // Default by node-imap, 
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
        imap.openBox('INBOX', false, function (err, box) {
            if(err) throw err;
            console.log('box open');
        });
        return res.send(true);
    });

    imap.on('mail', function(num) {
        console.log('mail');
        console.log('new mail : ', num);
        imap.search(['UNSEEN'], function (err, results) {
            if(results) {
                var f = imap.fetch(results, { bodies: '', struct: true });    
                f.on('message', function (msg, seqno) {
                    msg.on('body', function (stream, info) {
                        simpleParser(stream, (err, parsed) => {
                            console.log('unseen')
                        })
                    })
                })
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
        console.log('end');
    });

    imap.connect();
});

router.get('/disconnect', function(req, res, next) {
    imap.closeBox(function(err) {
        if(err) throw err;
        console.log('box closed');
    })
    imap.end()
});

router.get('/emails/all', jsonParser, function(req, res, next) {
    console.log(mails);
    var send = {
        error: '',
        mails: [],
    }
    imap.search('ALL', function(err, results) {
        console.log('here')
        if(err) {
            send.error = err
            return res.send(send);
        }
        if(!results) {
            return res.send(send);
        }
        console.log('here');
        var f = imap.fetch(results, { bodies: '', struct: true });
        console.log('here');
        f.on('message', function (msg, seqno) {
            console.log('here');
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
                })
                console.log(mail)
                send.mails.push(mail);
            })
        })
        return res.send(send);
    })
});

router.get('/emails/:address', function(req, res, next) {
    var send = {
        error: '',
        mails: [],
    }
    imap.search('ALL', function(err, results) {
        if(err) {
            send.error = err
            return res.send(send);
        }
        if(!results) {
            return res.send(send);
        }
        var f = imap.fetch(results, { bodies: '', struct: true });    
        f.on('message', function (msg, seqno) {
            msg.on('body', function (stream, info) {
                simpleParser(stream, (err, parsed) => {
                    if(parsed.from.value[0].address === req.params.address) {
                        mails.push(parsed);
                        console.log(parsed.subject);
                    }
                })
            })
        })
    })
    return send(send);
});

router.get('/emails/unseen', function(req, res, next) {
    var send = {
        error: '',
        mails: [],
    }
    imap.search('UNSEEN', function(err, results) {
        if(err) {
            send.error = err
            return res.send(send);
        }
        if(!results) {
            return res.send(send);
        }
        var f = imap.fetch(results, { bodies: '', struct: true });    
        f.on('message', function (msg, seqno) {
            msg.on('body', function (stream, info) {
                simpleParser(stream, (err, parsed) => {
                    mails.push(parsed);
                    console.log(parsed.subject);
                })
            })
        })
    })
    return send(send);
});

router.get('/emails/sent', function(req, res, next) {
    var send = {
        error: '',
        mails: [],
    }
    User.findOne({ id: req.body.id }, function(err, user) {
        if(err) {
            send.error = err;
            console.log(err);
            return res.send(send);
        }
        if(!user) {
            send.error = 'There\'s no account that has same id.';
            return res.send(send);
        }
        for(var i = 0; i < user.sent_messages.length; i++) {
            if(sent_messages[i].to === address) {
                send.mails.push(sent_messages[i]);
            }
        }
        return res.send(send);
    });
});

router.get('/emails/sent/:address', function(req, res, next) {
    const address = req.params.address;
    var send = {
        error: '',
        mails: [],
    }
    User.findOne({ id: req.body.id }, function(err, user) {
        if(err) {
            send.error = err;
            console.log(err);
            return res.send(send);
        }
        if(!user) {
            send.error = 'There\'s no account that has same id.';
            return res.send(send);
        }
        for(var i = 0; i < user.sent_messages.length; i++) {
            if(sent_messages[i].to === address) {
                send.mails.push(sent_messages[i]);
            }
        }
        return res.send(send);
    });
});

router.get('/emails/all/:address', function(req, res, next) {
    const address = req.params.address;
    const body = req.body;
    var send = {
        error: '',
        mails: [],
    }

    User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            send.error = err;
            console.log(err);
            return res.send(send);
        }
        if(!user) {
            send.error = 'There\'s no account that has same id.';
            return res.send(send);
        }
        for(var i = 0; i < user.sent_messages.length; i++) {
            if(sent_messages[i].to === address) {
                send.mails.push(sent_messages[i]);
            }
        }
    });

    imap.search('ALL', function(err, results) {
        if(err) {
            send.error = err
            return res.send(send);
        }
        if(!results) {
            return res.send(send);
        }
        var f = imap.fetch(results, { bodies: '', struct: true });    
        f.on('message', function (msg, seqno) {
            msg.on('body', function (stream, info) {
                simpleParser(stream, (err, parsed) => {
                    if(parsed.from.value[0].address === address) {
                        mails.push(parsed);
                        console.log(parsed.subject);
                    }
                })
            })
        })
    })

    return res.send(send);
})

module.exports = router;