"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUser = void 0;
var AccountUser = /** @class */ (function () {
    // constructor(
    //   name: string | undefined, 
    //   number: string | undefined, 
    //   email: string | undefined, 
    //   balance: number | undefined) {
    //     this._name = name ;
    //     this._number = number;
    //     this._email = email;
    //     this._balance = balance
    //   }
    function AccountUser(myarray) {
        this._name = myarray[0];
        this._number = myarray[1];
        this._email = myarray[2];
        this._balance = myarray[3];
    }
    // Function
    AccountUser.prototype.getInformation = function () {
        return [this._name, this._number, this._email, this._balance];
    };
    AccountUser.prototype.getName = function () {
        return this._name;
    };
    AccountUser.prototype.getEmail = function () {
        return this._email;
    };
    AccountUser.prototype.setName = function (name) {
        this._name = name;
    };
    return AccountUser;
}());
exports.AccountUser = AccountUser;
