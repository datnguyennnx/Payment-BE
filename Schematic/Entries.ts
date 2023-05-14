
export class Entries  {
    private _id: number 
    private _account_id: number 
    private _amount: number 
    private _createdAt: Date
    
    constructor( inforPayment: [number, number, number, Date]) {
        this._id = inforPayment[0]
        this._account_id = inforPayment[1] 
        this._amount = inforPayment[2]
        this._createdAt = inforPayment[3]
    }

    getInformation(){
        return [this._id, this._account_id, this._amount, this._createdAt ]
    }
}
