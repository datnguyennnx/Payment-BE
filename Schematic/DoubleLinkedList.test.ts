import { DoubleLinkedList } from "./DoubleLinkedList"
import { AccountUser } from "./Account"
import * as fs from 'fs';

const dataUser = fs.readFileSync("./data.json", 'utf-8')
const jsonData = JSON.parse(dataUser);

let propertiesUserArray = new Array()
const userArray = new DoubleLinkedList<AccountUser>

for(let key in jsonData.userArray) {
    for (let values in jsonData.userArray[key]) {
        propertiesUserArray.push(jsonData.userArray[key][values])
    }
    userArray.addFirst(new AccountUser(propertiesUserArray))
    propertiesUserArray = []
 }

userArray.printAll()



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
