import express, { Express, Request, Response } from "express"
import { DoubleLinkedList } from "../Schematic/DoubleLinkedList"
import { AccountUser } from "../Schematic/Account"
import { sponsorTo } from "../Schematic/Transfers"
import { Entries } from "../Schematic/Entries"
import * as fs from 'fs';
import *  as a from "./helper"


const userDBL = new DoubleLinkedList<AccountUser>

const dataUser = fs.readFileSync("../Schematic/data.json", 'utf-8')
const jsonData = JSON.parse(dataUser);

let data = new Array() , userDBL = a.renderData(jsonData, data, userDBL)

console.log(data)
console.log(userDBL)