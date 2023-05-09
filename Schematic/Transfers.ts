import { AccountUser } from "./Account"
import { Entries } from "./Entries"
import { DoubleLinkedList } from "./DoubleLinkedList"

type sponsorForm = [message: string, amount: number]
    


export class Transfers  {
    private _id: number | undefined
    private _from_account_id: number | undefined
    private _to_account_id: number | undefined
    private _message: string | undefined
    private _amount: number | undefined
    private _createdAt: Date

    constructor( inforTransfer: [number, number, string, number]) {
        this._id = Math.floor(new Date().valueOf() * Math.random())
        this._from_account_id = inforTransfer[0] 
        this._to_account_id = inforTransfer[1]
        this._message = inforTransfer[2]
        this._amount = inforTransfer[3]
        this._createdAt = new Date()
    }


    getInformation(){
        return [ this._id, this._from_account_id, this._to_account_id, this._message, this._amount ]
    }
    getTime(){
        return this._createdAt
    }
    getIDTransfers(){
        return this._id
    }

}

export function sponsorTo(userSponsor: AccountUser, userReceiver: AccountUser, 
                        sponsorArray: sponsorForm, entriesDBL: DoubleLinkedList<Entries>){
    if (userSponsor.getBalance() < sponsorArray[1] ) {
        return console.log("Not enough money for sponsor")
    } else {
        const _from_account_id = userSponsor.getAccountID()
        const _to_account_id = userReceiver.getAccountID()
        const _message = sponsorArray[0]
        const _amount =  sponsorArray[1]
        const sessionTranferOfSponsor = new Transfers([_from_account_id, _to_account_id,
                                                         _message, 0 - _amount])

        const sessionTranferOfReceiver = new Transfers([_from_account_id, _to_account_id,
                                                     _message, 0 + _amount])
        userSponsor.pushTransfer(sessionTranferOfSponsor)
        userReceiver.pushTransfer(sessionTranferOfReceiver)
        const inforSessionTransferofSponsor =  sessionTranferOfSponsor.getInformation()
        const inforSessionTransferofReceiver =  sessionTranferOfReceiver.getInformation()
        

        console.log(inforSessionTransferofSponsor)
        console.log(inforSessionTransferofReceiver)
        

        // const storeSessionTransferOfSponsor = new Entries([])
        // const storeSessionTransferOfReceiver = new Entries([])

        return userSponsor.sponsor(_amount) && userReceiver.receiver(_amount)
    }
}