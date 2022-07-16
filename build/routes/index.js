"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes = express.Router();
routes.get('/', function (req, res) {
    res.send("main api route");
});
exports.default = routes;
