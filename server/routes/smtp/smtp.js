const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')

router.post('/send', jsonParser, function(req, res, next) {
    const body = req.body;
    const smtp = req.body.smtp;
    let send = {
        error: '',
        mail: {
            date: new Date().getTime(),
            from: body.from.address,
            name: body.from.name,
            to: body.to,
            cc: body.cc ? body.cc : null,
            subject: '',
            html: body.html ? body.html : null,
            text: body.text ? body.text : null,
            sent: true,
        }
    }
    const transporter = nodeMailer.createTransport(smtpTransport({
        host: smtp.smtp_host,
        port: smtp.smtp_port,
        secure: smtp.smtp_secure,
        auth: {
            user: smtp.smtp_id,
            pass: smtp.smtp_password,
        }
    }))
})

router.post('/emails/sent', jsonParser, function(req, res, next) {
    let send = {
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

module.exports = router