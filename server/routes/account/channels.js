var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

var User = require('../../models/users');

router.post('/insert', jsonParser, function(req, res, next) {
    var body = req.body;
    var send = {
        error: '',
        channels: [],
    }
    User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            send.error = err
            console.log(err);
            return res.send(send);
        }
        if(!user) {
            send.error = 'There\'s no account exist.';
            return res.send(send);
        }
        for(let i = 0; i < user.channels.length; i++) {
            if(user.channels[i] === body.address) {
                send.error = 'There\'s already same address in the channel list.';
                return  res.send(send);
            }
        }
        send.channels = user.channels;
        send.channels.push(address);
        user.channels = send.channels;
        user.save(function(err){
            if(err) {
                send.error = 'Database error, save denied.';
                send.channels = [];
                return res.send(send);
            }
            return res.send(send);
        })
    });
});

router.post('/delete', jsonParser, function(req, res, next) {
    var body = req.body;
    var send = {
        error: '',
        channels: [],
    }
    User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            send.error = err
            console.log(err);
            return res.send(send);
        }
        if(!user) {
            send.error = 'There\'s no account exist.';
            return res.send(send);
        }
        let thereIs = false;
        let wheereIs;
        for(let i = 0; i < user.channels.length; i++) {
            if(user.channels[i] === body.address) {
                thereIs = true;
                wheereIs = i;
            }
        }
        if(!thereIs) {
            send.error = 'There\'s no address that you want to delete.'
            return res.send(send);
        }
        send.channels = user.channels;
        send.channels.splice(i, 1);
        user.channels = send.channels;
        user.save(function(err){
            if(err) {
                send.error = 'Data base error, save denied.';
                send.channels = [];
                return res.send(send);
            }
            return res.send(send);
        })
    });
});

module.exports = router;