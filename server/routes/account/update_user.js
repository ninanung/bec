var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

var User = require('../../models/users');

router.post('/', jsonParser, function(req, res, next) {
    var body = req.body;
    var info = {
        error: '',
    }
    User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            info.error = err;
            console.log(err);
            return res.send(info);
        }
        if(!user) {
            info.error = 'There\'s no account exist.';
            return res.send(info);
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