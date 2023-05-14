import { AccountUser } from "./Account"
import { Entries } from "./Entries"
import { DoubleLinkedList } from "./DoubleLinkedList"

type sponsorForm = [message: string, amount: number]
    
export class Transfers  {
    private _id: number 
    private _from_account_id: number 
    private _to_account_id: number 
    private _message: string 
    private _amount: number  
    private _createdAt: Date

    constructor( inforTransfer: [ number, number, string, number]) {
        this._id = Math.floor(new Date().valueOf() * Math.random())
        this._from_account_id = inforTransfer[0] 
        this._to_account_id = inforTransfer[1]
        this._message = inforTransfer[2]
        this._amount = inforTransfer[3]
        this._createdAt = new Date()
    }
    


    getInformation(): [number, number, number, string, number, Date] {
        return [ this._id, this._from_account_id, this._to_account_id, 
                        this._message, this._amount, this._createdAt ]
    }
    getTime(){
        return this._createdAt
    }
    getIDTransfers(){
        return this._id
    }
    setID(id: number){
        this._id = id
    }
}

export function sponsorTo(userSponsor: AccountUser, userReceiver: AccountUser, 
                        sponsorArray: sponsorForm, entriesDBL: DoubleLinkedList<Entries>){
    if (userSponsor.getBalance() < sponsorArray[1] ) {
        console.log("Not enough money for sponsor")
        return false
    } else {
        const _from_account_id = userSponsor.getAccountID()
        const _to_account_id = userReceiver.getAccountID()
        const _message = sponsorArray[0]
        const _amount =  sponsorArray[1]
        const sessionTranfer = new Transfers([_from_account_id, _to_account_id, _message, _amount])

        const idTranfer = sessionTranfer.getIDTransfers()
        const dateTranfer = sessionTranfer.getTime()
        
        const sessionTranferOfSponsor = new Transfers([ _from_account_id, _to_account_id,
                                                     _message, 0 - _amount])
        sessionTranferOfSponsor.setID(idTranfer)

        const sessionTranferOfReceiver = new Transfers([_from_account_id, _to_account_id,
                                                     _message, 0 + _amount])
        sessionTranferOfReceiver.setID(idTranfer)

        userSponsor.pushTransfer(sessionTranferOfSponsor)
        userReceiver.pushTransfer(sessionTranferOfReceiver)

        entriesDBL.addLast(new Entries([idTranfer, _from_account_id, 0 - _amount, dateTranfer]))
        entriesDBL.addLast(new Entries([idTranfer, _to_account_id, 0 + _amount, dateTranfer]))

        console.log("Success transfer")
        return userSponsor.sponsor(_amount) && userReceiver.receiver(_amount)
    }
}