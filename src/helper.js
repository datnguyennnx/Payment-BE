"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderData = void 0;
var Account_1 = require("../Schematic/Account");
function renderData(jsonData, data, userDBL) {
    for (var key in jsonData.userArray) {
        var propertiesUserArray = new Array();
        for (var values in jsonData.userArray[key]) {
            propertiesUserArray.push(jsonData.userArray[key][values]);
        }
        userDBL.addLast(new Account_1.AccountUser(propertiesUserArray));
        data.push(userDBL.getNodeValue(key));
    }
    return data && userDBL;
}
exports.renderData = renderData;
