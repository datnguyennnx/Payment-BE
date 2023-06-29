import express, { Request, Response, NextFunction } from 'express'
import Consola from 'consola'
import cors from 'cors'
import morgan from 'morgan'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import config from 'config'
import cookieParser from 'cookie-parser'
import validateEnv from './utils/validateEnv'
import redisClient from './utils/connectRedis'
import AppError from './utils/appError'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'

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
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`))
    })

    this.app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
      err.status = err.status || 'error'
      err.statusCode = err.statusCode || 500
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    })
  }

  private setConfig() {
    dotenv.config()
    validateEnv()
    this.app.use(express.json({ limit: '10kb' }))
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors({
      origin: [config.get<string>('origin')],
      credentials: true,
    }))
  }

  private setRequestLogger() {
    if (process.env.NODE_ENV === 'development') this.app.use(morgan(function (tokens, req, res) {
      return [
        "🤖", tokens.method(req, res),
        tokens.url(req, res),
        "|| status",tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
      ].join(' ')
    }))
  }
  private setRoutes() {
    this.app.get('/', (req, res) => { res.json({ success: true, message : "JWT Authentication"})})
    this.app.use('/api/v1/auth', authRouter)
    this.app.use('/api/v1/users', userRouter)
  }
}