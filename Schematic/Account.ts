import { Transfers } from "./Transfers"


export class AccountUser {
    private _account_id: number | undefined
    private _name: string | undefined
    private _number: string | undefined
    public _email: string | undefined
    private _balance: number | undefined
    private _listTransfer: Transfers[] | undefined

    constructor( inforUser: [string, string, string, number]) {
        this._account_id = Math.floor(new Date().valueOf() * Math.random());
        this._name = inforUser[0] 
        this._number = inforUser[1]
        this._email = inforUser[2]
        this._balance = inforUser[3]
        this._listTransfer = []
    }


    getInformation(){
      return [ this._name, this._number, this._email, this._balance ]
    }

    getName() {
        return this._name
    }

    getNumber() {
      return this._number
    }

    getEmail() {
        return this._email
    }

    getBalance() {
      return this._balance
    }

    setNumber(number: string) {
        this._number = number
    }

    setEmail(email: string) {
      this._email = email
    }

    setName(name: string) {
    this._name = name
    }

    getAccountID(_account_id: number){
      return this._account_id
    }

    sponsor(amount: number){
        return this._balance -= amount
    }

    receiver(amount: number){
        return this._balance += amount
    }

    pushTransfer(item: Transfers) {
        return this._listTransfer?.push(item)
    }
    
    getListTransfer(){
      return this._listTransfer
    }
  }
