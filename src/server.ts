import express, { Express, Request, Response } from "express"
import { DoubleLinkedList } from "../Schematic/DoubleLinkedList"
import { AccountUser } from "../Schematic/Account"
import { sponsorTo } from "../Schematic/Transfers"
import { Entries } from "../Schematic/Entries"
import * as fs from 'fs';
import *  as helper from "./helper"


const userDBL = new DoubleLinkedList<AccountUser>
const paymentDBL = new DoubleLinkedList<Entries>

const data = new Array()

const dataUser = fs.readFileSync("./data.json", 'utf-8')
const jsonData = JSON.parse(dataUser);

helper.renderData(jsonData, data, userDBL)

console.log(data, userDBL)


function returnObject(data: any[], email: string) {
    for( let key in data) {
        for (let value in data[key]){
            if( email == data[key][value]){
                return data[key]
            }
        }
    }
}


const port = 8000


const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send(JSON.stringify(JSON.stringify(data)))
}) 

app.listen(port, () => {
    console.log('now listen on port ', port)
})