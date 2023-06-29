import config from 'config'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import AppError from "../utils/appError"
import redisClient from "../utils/connectRedis"
import { omit } from 'lodash'
import { signJwt, verifyJwt } from "../utils/jwt"
import { LoginUserInput, RegisterUserInput, } from "../schemas/user.schema"
import { createUser, findUniqueUser, signTokens, excludedFields } from "../services/user.service"
import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction, CookieOptions } from "express"


// Cookie Options
const cookiesOptions: CookieOptions = { 
    httpOnly: true, 
    sameSite: 'lax'
}

if ( process.env.NODE_ENV === 'production') cookiesOptions.secure = true

const accessTokenCookieOptions: CookieOptions = { 
    ...cookiesOptions,
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ), 
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000
}

const refreshTokenCookieOptions: CookieOptions = { 
    ...cookiesOptions,
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ), 
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000
}

// Register User Controller
export const registerUserHandler = async (
    req: Request<{}, {}, RegisterUserInput>,
    res: Response,
    next: NextFunction ) => {
        try { 
            const hashedPassword = await bcrypt.hash(req.body.password, 12)
            const verifyCode = crypto.randomBytes(32).toString('hex')
            const verificationCode = crypto
            .createHash('sha256')
            .update(verifyCode)
            .digest('hex')

            const user = await createUser({
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: hashedPassword,
                verificationCode
            })

            const newUser = omit(user, excludedFields);

            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
                    }
                })
        } catch (error: any) { 
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(409).json({
                        status: 'fail',
                        message: 'Email already exist, please use another email address'
                    })
                }
            }

            next(error)
        }
    }

// Login User Controller
export const loginUserHandler = async ( 
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction ) => { 
        try { 
            const { email, password } = req.body
            const user = await findUniqueUser(
                { email: email.toLowerCase() },
                { id: true, email: true, verified: true, password: true}
            )
            
            if (!user || !(await bcrypt.compare(password, user.password))){
                return next(new AppError(400, 'Invalid email or password'))
            }
            // Sign Tokens
            const { access_token, refresh_token } = await signTokens(user)
            res.cookie('access_token', access_token, accessTokenCookieOptions)
            res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions)
            res.cookie('logged_in', true, { 
                ...accessTokenCookieOptions,
                httpOnly: false
            })

            res.status(200).json({
                status: 'success',
                access_token
            })
        } catch (error: any) { 
            next(error)
        }
    }

export const refreshAccessTokenHandler = async (
    req: Request, 
    res: Response,
    next: NextFunction ) => { 
        try { 
            const refresh_token = req.cookies.refresh_token
            const message = 'Could not refresh access token'

            // Validate refresh token
            if (!refresh_token) {
                return next(new AppError(403, message))
            }

            const decoded = verifyJwt<{sub: string}>(refresh_token, 'refreshTokenPublicKey')
            if (!decoded) {
                return next(new AppError(403, message))
            }

            // Check if user has a valid session
            const session = await redisClient.get(decoded.sub)
            if (!session) {
                return next(new AppError(403, message))
            }

            // Check if user still exist
            const user = await findUniqueUser({ id: JSON.parse(session).id})
            if (!user) {
                return next(new AppError(403, message))
            }
   
            // Sign new access token
            const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
                expiresIn: `&{config.get<number>('accessTokenExpiresIn)}m`
            })
            
            // Add Cookies
            res.cookie('access_token', access_token, accessTokenCookieOptions)
            res.cookie('login_in', true, {
                ...accessTokenCookieOptions,
                httpOnly: false
            })

            // Send Response
            res.status(200).json({
                status: 'success',
                access_token
            })
        } catch (error: any) {
            next(error)
        }
    }

function logout(res: Response) {
    res.cookie('access_token', '', { maxAge: -1 })
    res.cookie('refresh_token', '', { maxAge: -1 })
    res.cookie('logged_in', '', { maxAge: -1 })
}
    
export const logoutUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        await redisClient.del(res.locals.user.id)
        logout(res)
    
        res.status(200).json({
        status: 'success'
        })
    } catch (error: any) {
        next(error)
    }
}