"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mw_1 = require("./middleware/mw");
var path = require("path");
var fs = require("fs");
var app = express();
var port = 3000;
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
app.get('/image', mw_1.logger, function (req, res) {
    try {
        if (Number(req.query.length) > 0
            && Number(req.query.length) < 5000
            && Number(req.query.width) > 0
            && Number(req.query.width) < 5000) {
            var img = fs.readFileSync(path.join(__dirname, './', "../thubnail/image=".concat(req.query.name, "-length=").concat(req.query.length, "-width=").concat(req.query.width, ".jpg")));
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img, 'binary');
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        res.sendStatus(400);
    }
});
exports.default = app;
