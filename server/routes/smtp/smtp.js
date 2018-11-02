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
    };
    const emailOption = {
        from: {
            name: body.from.name,
            address: body.from.address,
        },
        to: body.to,
        cc: body.cc ? body.cc : [],
        subject: "New mail from " + body.from.name,
        html: body.html ? body.html : '',
        text: body.text ? body.text : '',
    };
    const transporter = nodeMailer.createTransport(smtpTransport({
        host: smtp.smtp_host,
        port: smtp.smtp_port,
        secure: smtp.smtp_secure,
        auth: {
            user: smtp.smtp_id,
            pass: smtp.smtp_password,
        }
    }));
    User.findOne({ id: body.id }, function(err, user) {
        if(err) {
            info.error = err;
            return res.send(send);
        }
        if(!user) {
            info.error = 'There\'s no account exist.';
            return res.send(send);
        }
        transporter.verify(function(error, success) {
            if (error) {
                send.error = error;
                return res.send(send);
            } else {
                console.log('SMTP ready');
            }
        });
        transporter.sendMail(emailOption, (error, inf) => {
            if(error) {
                send.error = "Email sending fail. Please check your Email.";
                return res.send(send);
            }
            console.log(inf.messageId);
        });
        console.log('user');
        const mail = {
            date: new Date().getTime(),
            from: body.from.address,
            name: body.from.name,
            to: body.to,
            cc: body.cc ? body.cc : [],
            subject: "New mail from " + body.from.name,
            html: body.html ? body.html : '',
            text: body.text ? body.text : '',
            sent: true,
        }
        user.sent_messages.push(mail)
        user.save(function(err){
            if(err) {
                info.error = "Database error";
                return res.send(send);
            }
        })
        console.log('add mail info')
        send.mail = mail;
        return res.send(send);
    });
})

router.post('/emails/sent', jsonParser, function(req, res, next) {
    let send = {
        error: '',
        mails: null,
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
        send.mails = user.sent_messages.slice();
        return res.send(send);
    });
});

module.exports = router