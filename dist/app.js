"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
app.get("/", function (req, res) {
    console.log(req);
    res.send("Hello World!");
});
app.post("/test", function (req, res) {
    res.send({ person: "seol" });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map