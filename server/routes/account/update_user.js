var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

var User = require('../../models/users');

router.post('/', jsonParser, function(req, res, next) {
    var body = req.body;
    var info = {
        error: '',
        info: null,
    }
    User.findOne({ id: body.basic_id }, function(err, user) {
        if(err) {
            info.error = err;
            console.log(err);
            return res.send(info);
        }
        if(!user) {
            info.error = 'There\'s no account exist.';
            return res.send(info);
        }
        switch (body.settingType) {
            case 'basic':
                user.password = body.password;
                user.address = body.address;
                user.name = body.name;
                break;
            case 'imap':
                user.imap_id = body.id;
                user.imap_password = body.password;
                user.imap_host = body.host;
                user.imap_port = body.port;
                user.imap_tls = body.security;
                break;
            case 'smtp':
                user.smtp_id = body.id;
                user.smtp_password = body.password;
                user.smtp_host = body.host;
                user.smtp_port = body.port;
                user.smtp_secure = body.security;
                break;
            default:
                break;
        }
        user.save(function(err){
            if(err) {
                info.error = "Database error";
                return res.send(info);
            }
        })
        return res.send(info);
    });
});

module.exports = router;