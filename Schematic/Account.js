"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUser = void 0;
var AccountUser = /** @class */ (function () {
    function AccountUser(inforUser) {
        this._account_id = Math.floor(new Date().valueOf() * Math.random());
        this._name = inforUser[0];
        this._number = inforUser[1];
        this._email = inforUser[2];
        this._balance = inforUser[3];
        this._listTransfer = [];
    }
    AccountUser.prototype.getInformation = function () {
        return [this._name, this._number, this._email, this._balance];
    };
    AccountUser.prototype.getName = function () {
        return this._name;
    };
    AccountUser.prototype.getNumber = function () {
        return this._number;
    };
    AccountUser.prototype.getEmail = function () {
        return this._email;
    };
    AccountUser.prototype.getBalance = function () {
        return this._balance;
    };
    AccountUser.prototype.setNumber = function (number) {
        this._number = number;
    };
    AccountUser.prototype.setEmail = function (email) {
        this._email = email;
    };
    AccountUser.prototype.setName = function (name) {
        this._name = name;
    };
    AccountUser.prototype.getAccountID = function (_account_id) {
        return this._account_id;
    };
    AccountUser.prototype.sponsor = function (amount) {
        return this._balance -= amount;
    };
    AccountUser.prototype.receiver = function (amount) {
        return this._balance += amount;
    };
    AccountUser.prototype.pushTransfer = function (item) {
        var _a;
        return (_a = this._listTransfer) === null || _a === void 0 ? void 0 : _a.push(item);
    };
    AccountUser.prototype.getListTransfer = function () {
        return this._listTransfer;
    };
    return AccountUser;
}());
exports.AccountUser = AccountUser;
