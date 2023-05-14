"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DoubleLinkedList_1 = require("../Schematic/DoubleLinkedList");
var fs = require("fs");
var helper = require("./helper");
var userDBL = new DoubleLinkedList_1.DoubleLinkedList;
var paymentDBL = new DoubleLinkedList_1.DoubleLinkedList;
var data = new Array();
var dataUser = fs.readFileSync("../Schematic/data.json", 'utf-8');
var jsonData = JSON.parse(dataUser);
data, userDBL = helper.renderData(jsonData, data, userDBL);
console.log(data, userDBL);
function returnObject(data, email) {
    for (var key in data) {
        for (var value in data[key]) {
            if (email == data[key][value]) {
                return data[key];
            }
        }
    }
}
var port = 8000;
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send(JSON.stringify(JSON.stringify(data)));
});
app.listen(port, function () {
    console.log('now listen on port ', port);
});
