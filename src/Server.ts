import express from 'express'
import  Consola from 'consola'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'


export class Server {
  public app: express.Application
  public logger = Consola 
  private prisma: PrismaClient = new PrismaClient()

  public constructor() {
    this.app = express()
  }

  public start() {
    this.setConfig()
    this.setRequestLogger()
    this.setRoutes()
    
    this.app.listen(process.env.PORT, () => { 
      this.logger.success(`Server started on port ${process.env.PORT}`)
    })
  }

  private setConfig() {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
    dotenv.config()
  }

  private setRequestLogger() {
    this.app.use(async (req, res, next) => {
      console.log(`[${req.method} - ${req.path}]`)
      next()
    })
  }

  private setRoutes() {
    this.app.get('/', (req, res) => {
      res.json({ success: true, message : "JWT Authencation"})
    })
  }

  public async sendQuery() { 
    const result = await this.prisma.test.create({
      data: {
        id: 1,
        key: "Hello world!",
        key2: " Goodbye ?"
      }
    }) 
    console.log(result )
  }
}