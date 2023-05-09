"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorTo = exports.Transfers = void 0;
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
        return [this._id, this._from_account_id, this._to_account_id, this._message, this._amount];
    };
    Transfers.prototype.getTime = function () {
        return this._createdAt;
    };
    Transfers.prototype.getIDTransfers = function () {
        return this._id;
    };
    return Transfers;
}());
exports.Transfers = Transfers;
function sponsorTo(userSponsor, userReceiver, sponsorArray, entriesDBL) {
    if (userSponsor.getBalance() < sponsorArray[1]) {
        return console.log("Not enough money for sponsor");
    }
    else {
        var _from_account_id = userSponsor.getAccountID();
        var _to_account_id = userReceiver.getAccountID();
        var _message = sponsorArray[0];
        var _amount = sponsorArray[1];
        var sessionTranferOfSponsor = new Transfers([_from_account_id, _to_account_id,
            _message, 0 - _amount]);
        var sessionTranferOfReceiver = new Transfers([_from_account_id, _to_account_id,
            _message, 0 + _amount]);
        userSponsor.pushTransfer(sessionTranferOfSponsor);
        userReceiver.pushTransfer(sessionTranferOfReceiver);
        var inforSessionTransferofSponsor = sessionTranferOfSponsor.getInformation();
        var inforSessionTransferofReceiver = sessionTranferOfReceiver.getInformation();
        console.log(inforSessionTransferofSponsor);
        console.log(inforSessionTransferofReceiver);
        // const storeSessionTransferOfSponsor = new Entries([])
        // const storeSessionTransferOfReceiver = new Entries([])
        return userSponsor.sponsor(_amount) && userReceiver.receiver(_amount);
    }
}
exports.sponsorTo = sponsorTo;
