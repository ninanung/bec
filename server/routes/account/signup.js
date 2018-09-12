var express = require('express');
var router = express.Router();

var User = require('../../models/users');

router.post('/', function(req, res, next) {
    var body = req.body;
    var userinfo = {
        id: body.id,
        password: body.password,
        imap_id: body.imap_id,
        imap_password: body.imap_password,
        imap_host: body.imap_host,
        imap_port: body.imap_port,
        imap_tls: body.imap_tls,
        smtp_id: body.smtp_id,
        smtp_password: body.smtp_password,
        smtp_host: body.smtp_host,
        smtp_port: body.smtp_port,
        smtp_secure: body.smtp_secure
    }
    var info = {
        error: '',
        words: '',
    }
    /*User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            info.error = 'true';
            info.words = err;
            console.log(err);
            return res.send(info);
        }
        if(user) {
            info.error = 'true';
            info.words = 'There\'s already same id exist.';
            return res.send(info);
        }
        let newUser = new User(userinfo);
        newUser.save(function(err) {    
            if(err) {
                info.error = 'true';
                info.words = err;
                console.log(err);
            }
        });
        return res.send(info);
    });*/
    return res.send(userinfo);
});

module.exports = router;