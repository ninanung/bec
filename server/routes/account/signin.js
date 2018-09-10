var express = require('express');
var Imap = require('imap')
var router = express.Router();

var User = require('../../models/users');

router.get('/', function(req, res, next) {
    var body = req.body;
    var info = {
        error: '',
        words: '',
    }
    User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            info.error = 'true';
            info.words = err;
            console.log(err);
            return res.send(info);
        }
        if(!user) {
            info.error = 'true';
            info.words = 'There\'s no account that has same id.';
            return res.send(info);
        }
        if(user.password !== body.password) {
            info.error = 'true';
            info.words = 'Wrong password.';
            return res.send(info);
        }
        var imap = new Imap({
            user: user.imap_id,
            password: user.imap_password,
            host: user.imap_host,
            port: user.imap_port,
            tls: user.imap_tls,
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

        imap.connect();

        return res.send(user);
    });
});

module.exports = router;