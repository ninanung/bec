var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

var User = require('../../models/users');

router.post('/', jsonParser, function(req, res, next) {
    var body = req.body;
    var userinfo = {
        id: body.id,
        password: body.password,
        address: body.address,
        name: body.name,
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
        error: null,
    }
    User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            info.error = err;
            console.log(err);
            return res.send(info);
        }
        if(user) {
            info.error = 'There\'s already same id exist.';
            return res.send(info);
        }
        let newUser = new User(userinfo);
        newUser.save(function(err) {    
            if(err) {
                info.error = err;
                console.log(err);
                return res.send(info);
            }
        });
        return res.send(info);
    });
});

module.exports = router;