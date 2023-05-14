"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorTo = exports.Transfers = void 0;
var Entries_1 = require("./Entries");
var Transfers = /** @class */ (function () {
    function Transfers(inforTransfer) {
        this._id = Math.floor(new Date().valueOf() * Math.random());
        this._from_account_id = inforTransfer[0];
        this._to_account_id = inforTransfer[1];
        this._message = inforTransfer[2];
        this._amount = inforTransfer[3];
        this._createdAt = new Date();
    }
    Transfers.prototype.getInformation = function () {
        return [this._id, this._from_account_id, this._to_account_id,
            this._message, this._amount, this._createdAt];
    };
    Transfers.prototype.getTime = function () {
        return this._createdAt;
    };
    Transfers.prototype.getIDTransfers = function () {
        return this._id;
    };
    Transfers.prototype.setID = function (id) {
        this._id = id;
    };
    return Transfers;
}());
exports.Transfers = Transfers;
function sponsorTo(userSponsor, userReceiver, sponsorArray, entriesDBL) {
    if (userSponsor.getBalance() < sponsorArray[1]) {
        console.log("Not enough money for sponsor");
        return false;
    }
    else {
        var _from_account_id = userSponsor.getAccountID();
        var _to_account_id = userReceiver.getAccountID();
        var _message = sponsorArray[0];
        var _amount = sponsorArray[1];
        var sessionTranfer = new Transfers([_from_account_id, _to_account_id, _message, _amount]);
        var idTranfer = sessionTranfer.getIDTransfers();
        var dateTranfer = sessionTranfer.getTime();
        var sessionTranferOfSponsor = new Transfers([_from_account_id, _to_account_id,
            _message, 0 - _amount]);
        sessionTranferOfSponsor.setID(idTranfer);
        var sessionTranferOfReceiver = new Transfers([_from_account_id, _to_account_id,
            _message, 0 + _amount]);
        sessionTranferOfReceiver.setID(idTranfer);
        userSponsor.pushTransfer(sessionTranferOfSponsor);
        userReceiver.pushTransfer(sessionTranferOfReceiver);
        entriesDBL.addLast(new Entries_1.Entries([idTranfer, _from_account_id, 0 - _amount, dateTranfer]));
        entriesDBL.addLast(new Entries_1.Entries([idTranfer, _to_account_id, 0 + _amount, dateTranfer]));
        console.log("Success transfer");
        return userSponsor.sponsor(_amount) && userReceiver.receiver(_amount);
    }
}
exports.sponsorTo = sponsorTo;
