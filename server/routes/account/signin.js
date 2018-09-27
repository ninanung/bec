var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

var User = require('../../models/users');

router.get('/', jsonParser, function(req, res, next) {
    var body = req.body;
    var info = {
        error: '',
        words: '',
        user: null,
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
        info.user = user;
        return res.send(info);
    });
});

module.exports = router;