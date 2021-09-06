"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
app.use(function (req, res, next) {
    console.log(req.rawHeaders[0]);
    console.log("this is logging middleware");
    next();
});
app.get("/cats/blue", function (req, res, next) {
    console.log(req.rawHeaders[0]);
    console.log("this is blue middleware");
    next();
});
app.get("/cats", function (req, res) {
    console.log(req);
    res.send({ cats: app_model_1.Cat });
});
app.get("/cats/blue", function (req, res) {
    res.send({ blue: app_model_1.Cat[0] });
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
});
app.listen(3000, function () {
    console.log("server is on ... ");
});
//# sourceMappingURL=app.js.map