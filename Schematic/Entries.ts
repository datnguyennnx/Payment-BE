
export class Entries  {
    private _id: number | undefined
    private _account_id: number | undefined
    private _amount: number | undefined
    private _createdAt: Date
    
    constructor( inforPayment: any[]) {
        this._id = inforPayment[0]
        this._account_id = inforPayment[1] 
        this._amount = inforPayment[2]
        this._createdAt = new Date()
    }

    getInformation(){
        return [this._id, this._account_id, this._amount, this._createdAt ]
    }
}
