import express, { Express, Request, Response } from "express"
import { DoubleLinkedList } from "../Schematic/DoubleLinkedList"
import { AccountUser } from "../Schematic/Account"
import * as fs from 'fs';

const port = 8000

const accout1 = new AccountUser(["Dat Nguyen", "0903260302", "Official.nguyendat@gmail.com", 0])
const accout2 = new AccountUser(["Tran Nguyen Anh Khoa", "0903260302", "Official.anhkhoa@gmail.com", 100])
const accout3 = new AccountUser(["Mai Hong Phong", "0903260302", "Official.hongphong@gmail.com", 200])
const newArray = new DoubleLinkedList<AccountUser>
newArray.addFirst(accout1)
newArray.addFirst(accout2)
newArray.addFirst(accout3)

const data = [accout1.getInformation(), accout2.getInformation(), accout3.getInformation()]

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send(JSON.stringify(data))
}) 

app.listen(port, () => {
    console.log('now listen on port ', port)
})