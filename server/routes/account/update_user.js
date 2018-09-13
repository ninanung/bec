var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

var User = require('../../models/users');

router.post('/', jsonParser, function(req, res, next) {
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
            info.words = 'There\'s no account exist.';
            return res.send(info);
        }
        user.id = body.id,
        user.password = body.password,
        user.imap_id = body.imap_id,
        user.imap_password = body.imap_password,
        user.imap_host = body.imap_host,
        user.imap_port = body.imap_port,
        user.imap_tls = body.imap_tls,
        user.smtp_id = body.smtp_id,
        user.smtp_password = body.smtp_password,
        user.smtp_host = body.smtp_host,
        user.smtp_port = body.smtp_port,
        user.smtp_secure = body.smtp_secure
        user.save(function(err){
            if(err) {
                info.error = "true";
                info.words = "데이터베이스 오류가 발생했습니다. 다시 시도해 주세요";
                return res.send(info);
            }
        })
        return res.send(info);
    });
});

module.exports = router;