const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports = router;