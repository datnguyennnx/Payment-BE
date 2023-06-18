import express, { Request, Response, NextFunction } from 'express';
import Consola from 'consola'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import validateEnv from './utils/validateEnv';
import redisClient from './utils/connectRedis';

export class Server {
  public app: express.Application
  public logger = Consola 

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
    dotenv.config()
    validateEnv();
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  private setRequestLogger() {
    this.app.use(async (req, res, next) => {
      console.log(`[${req.method} - ${req.path}]`)
      next()
    })
  }

  private setRoutes() {
    this.app.get('/', (req, res) => {
      res.json({ success: true, message : "JWT Authentication"})
    })
  }

  public async bootstrap() {
    this.app.get('/api/healthchecker', async (_, res: Response) => {
      const message = await redisClient.get('try');
      res.status(200).json({
        status: 'success',
        message,
      });
    });
  }
}