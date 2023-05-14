import { DoubleLinkedList } from "./DoubleLinkedList"
import { AccountUser } from "./Account"
import { sponsorTo } from "./Transfers"
import { Entries } from "./Entries"
import * as fs from 'fs';
import * as promptSync from 'prompt-sync'





// console.log(data[1])
// console.log(userDBL.getNodeValue(1))
// data[1].setName("Khoa")
// data[1].setEmail("abcxyz@gmail.com")
// data[1].setNumber("0123123")
// console.log("===================================================")
// console.log(data[1])
// console.log(userDBL.getNodeValue(1))



// console.log(data)


//Return object
function returnObject(data: any[], email: string) {
    for( let key in data) {
        for (let value in data[key]){
            if( email == data[key][value]){
                return data[key]
            }
        }
    }
} 

const dataUser = fs.readFileSync("./data.json", 'utf-8')
const jsonData = JSON.parse(dataUser);
const data = new Array()
const prompt = promptSync({sigint: true});

const userDBL = new DoubleLinkedList<AccountUser>
const paymentDBL = new DoubleLinkedList<Entries>




for(let key in jsonData.userArray) {
    let propertiesUserArray = new Array()
    for (let values in jsonData.userArray[key]) {
        propertiesUserArray.push(jsonData.userArray[key][values])
    }
    userDBL.addLast(new AccountUser(propertiesUserArray))
    data.push(userDBL.getNodeValue(key))
}

while(true){
    console.log("1. Donated to blog ")
    console.log("2. Show Value DBL User")
    console.log("3. Show Value DLB Payment")
    console.log("4. Show Node DBL User")
    console.log("5. Show Node DLB Payment")

    let positionStr = prompt("Chosse [1-5]:--   ")
    const position: number = +positionStr
    switch(position) { 
        case 1: { 
            console.log("===== Email available =====")
            userDBL.printAllEmail()
            let emailReceiver = prompt("Input email Receiver: ")
            let emailSponsor = prompt("Input email Sponsor:  ")
            let amount = prompt("Sponsor amount: ")
            let message = prompt("Write message: ") 
            let amountVal: number = +amount

            emailReceiver.toLowerCase()
            emailSponsor.toLowerCase()

            let userReceiver = returnObject(data, emailReceiver)
            let userSponsor = returnObject(data, emailSponsor)

            while(((userReceiver && userSponsor) != undefined) && ((emailSponsor === emailReceiver) != false)){

                emailReceiver = prompt("Input email Receiver: ")
                emailSponsor = prompt("Input email Sponsor:  ")
                amount = prompt("Sponsor amount: ")
                message = prompt("Write message: ") 

                emailReceiver.toLowerCase()
                emailSponsor.toLowerCase()

                userReceiver = returnObject(data, emailReceiver)
                userSponsor = returnObject(data, emailSponsor)
            }
            sponsorTo(userSponsor, userReceiver, [message, amountVal], paymentDBL)
            console.log("======================================================")
            break
        } 
        case 2: { 
            userDBL.printAll()
            break; 
        } 
        case 3: { 
            paymentDBL.printAll()
            break; 
        } 
        case 4: { 
            console.log(userDBL)
            break; 
        } 
        case 5: { 
            console.log(paymentDBL)
            break; 
        } 
        case 6: { 
            userDBL.bubbleSort(userDBL)
            break; 
        } 

        
        default: { 
            console.log("WRONG INPUT")
            break; 
        } 
     } 
    // const amountVal: number = +amount
    // const checkMail = email  

    // if(email == data[0].getEmail()){
    //     console.error("This email is used to donated. (Wrong email)")
    //     email = prompt("Input email (Sponsor):  ")
    //     amount = prompt("Sponsor amount: ")
    //     message = prompt("Write message: ")
    // }  else {
    //     continue
    // }

    // // const checkMail1 = "Official.hongphong@gmail.com"
    // // const form1 = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. ", 100]


    // const userSponsor = returnObject(data, checkMail)
    // // const userSponsor1 = returnObject(data, checkMail1)


    // const userReceiver = data[0]

    // // console.log(data[0])
    // // console.log(userSponsor)
    // // console.log(userSponsor1)

    // console.log("===================================================")
    
    // // sponsorTo(userSponsor1, userReceiver, form1, paymentDBL)

    // // console.log(data[0])
    // // console.log(userSponsor)
    // console.log(userDBL)
    // // console.log("===================================================")

    // // console.log(userSponsor1)
    // console.log("===================================================")
    // console.log(paymentDBL)
}




// // Return value of object
// for( let key in data) {
//     for (let value in data[key]){
//         if(checkMail == data[key][value]){
//             console.log(data[key][value]) 
//             break
//         }
//     }
// }



// console.log(userArray.get_Node_Value(1))
// console.log("===================================================")
// console.log(data)
// const account1 = new AccountUser(["Dat Nguyen", "0903260302", "Official.nguyendat@gmail.com", 0])
// const account2 = new AccountUser(["Tran Nguyen Anh Khoa", "0903260302", "Official.anhkhoa@gmail.com", 100])
// const account3 = new AccountUser(["Mai Hong Phong", "0903260302", "Official.hongphong@gmail.com", 200])

// const newArray = new DoubleLinkedList<AccountUser>
// newArray.addFirst(account1)
// newArray.addFirst(account2)
// newArray.addFirst(account3)












































// const accout1 = new AccountUser(["Dat Nguyen", "0903260302", "Official.nguyendat@gmail.com", 0])
// const accout2 = new AccountUser("Tran Nguyen Anh Khoa", "0903260302", "Official.anhkhoa@gmail.com", 100)
// const accout3 = new AccountUser("Mai Hong Phong", "0903260302", "Official.hongphong@gmail.com", 200)
// // const accout4 = new AccountUser("Duy Thanh", "0903260302", "Official.duythanh@gmail.com", 3000)
// const accout5 = new AccountUser("Minh Khoi", "0903260302", "Official.minhkhoi@gmail.com", 4000)
// const accout6 = new AccountUser()

// accout6.setName("Phan Minh Nhat")


// const newArray = new DoubleLinkedList<AccountUser>
// newArray.addFirst(accout1)
// newArray.printAll()

// newArray.addLast(accout2)
// newArray.removeFirst()
// newArray.addFirst(accout3)
// // newArray.push(accout4)
// // newArray.addLast(accout5)
// newArray.addLast(accout6)
// newArray.printAll()


// console.log(accout1.getName())
// console.log(accout1.getInformation())

// console.log("Index in array: " , newArray.indexOf(accout3))
// console.log("Length: ", newArray.length())
