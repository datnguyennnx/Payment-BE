import { DoubleLinkedList } from "../Schematic/DoubleLinkedList"
import { AccountUser } from "../Schematic/Account"


export function renderData (jsonData: any, data: any[], userDBL: DoubleLinkedList<AccountUser>) { 
    for(let key in jsonData.userArray) {
        const propertiesUserArray = new Array()
        for (let values in jsonData.userArray[key]) {
            propertiesUserArray.push(jsonData.userArray[key][values])
        }
        userDBL.addLast(new AccountUser(propertiesUserArray))
        data.push(userDBL.getNodeValue(key))
    }
    return data && userDBL
}