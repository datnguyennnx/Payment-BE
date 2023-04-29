export class AccountUser {
    private _name: string | undefined;
    private _number: string | undefined;
    private _email: string | undefined;
    private _balance: number | undefined;


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
    constructor( myarray: any[]) {
        this._name = myarray[0] ;
        this._number = myarray[1];
        this._email = myarray[2];
        this._balance = myarray[3]
      }

      // Function
    getInformation(){
      return [ this._name, this._number, this._email, this._balance ]
    }

    getName() {
        return this._name
    }
    getEmail() {
        return this._email
    }

    setName(name: string) {
        this._name = name
    }
  }
