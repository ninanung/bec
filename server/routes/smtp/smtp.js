const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')

const User = require('../../models/users');

router.post('/send', jsonParser, function(req, res, next) {
    const body = req.body;
    const smtp = req.body.smtp;
    let send = {
        error: '',
        mail: null,
    }
    const transporter = nodeMailer.createTransport(smtpTransport({
        host: smtp.smtp_host,
        port: smtp.smtp_port,
        secure: smtp.smtp_secure,
        auth: {
            user: smtp.smtp_id,
            pass: smtp.smtp_password,
        }
    }));
    transporter.verify(function(error, success) {
        if (error) {
            send.error = error;
            return res.send(send);
        } else {
            console.log('SMTP ready');
        }
    });
    const emailOption = {
        from: {
            name: body.from.name,
            address: body.from.address,
        },
        to: body.to,
        cc: body.cc ? body.cc : [],
        subject: "Hi, " + id + "! This is Siary! Please confirm your Email.",
        html: body.html ? body.html : '',
        text: body.text ? body.text : '',
    }
    transporter.sendMail(emailOption, (error, inf) => {
        if(error) {
            send.error = "Email sending fail. Please check your Email.";
            return res.send(send);
        }
        console.log(inf.messageId);
    });

    //last send
    send.mail = {
        date: new Date().getTime(),
        from: body.from.address,
        name: body.from.name,
        to: body.to,
        cc: body.cc ? body.cc : [],
        subject: '',
        html: body.html ? body.html : '',
        text: body.text ? body.text : '',
        sent: true,
    }
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