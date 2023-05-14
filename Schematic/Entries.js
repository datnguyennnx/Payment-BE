"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entries = void 0;
var Entries = /** @class */ (function () {
    function Entries(inforPayment) {
        this._id = inforPayment[0];
        this._account_id = inforPayment[1];
        this._amount = inforPayment[2];
        this._createdAt = inforPayment[3];
    }
    Entries.prototype.getInformation = function () {
        return [this._id, this._account_id, this._amount, this._createdAt];
    };
    return Entries;
}());
exports.Entries = Entries;
