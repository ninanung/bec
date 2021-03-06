const mongoose = require("mongoose");

const users = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true},
    name: { type: String, required: true},

    imap_id: { type: String, required: true},
    imap_password: { type: String, required: true },
    imap_host: { type: String, required: true },
    imap_port: { type: String, required: true },
    imap_tls: { type: Boolean, required: true },

    smtp_id: { type: String, required: true },
    smtp_password: { type: String, required: true },
    smtp_host: { type: String, required: true },
    smtp_port: { type: String, required: true },
    smtp_secure: { type: Boolean, required: true },

    channels: [{ 
        name: { type: String },
        address: { type: String },
    }],

    sent_messages: [{
        from: { type: String },
        name: { type: String },
        to: [{ type: String }],
        cc: [{ type: String }],
        subject: { type: String },
        html: { type: String },
        text: { type: String },
        date: { type: Number },
        sent: { type: Boolean },
    }],
});

const User = mongoose.model("user", users);

module.exports = User;