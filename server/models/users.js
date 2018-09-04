const mongoose = require("mongoose");

const users = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imap_id: { type: String, required: true},
    imap_password: { type: String, required: true },
    imap_host: { type: String, required: true },
    imap_port: { type: String, required: true },
    imap_tls: { type: Boolean, required: true },
});

const User = mongoose.model("user", users);

module.exports = User;