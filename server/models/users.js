const mongoose = require("mongoose");

const users = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },

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

    sent_messages: {
        from: { type: String },
        to: { type: String },
        subject: { type: String },
        html: { type: String },
        text: { type: String },
    }
});

const User = mongoose.model("user", users);

module.exports = User;