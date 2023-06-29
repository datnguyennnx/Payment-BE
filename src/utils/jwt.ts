import jwt, { SignOptions } from 'jsonwebtoken'
import config from 'config'
import * as dotenv from 'dotenv'
dotenv.config()


export const signJwt = ( 
    payload: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options: SignOptions | undefined ) => { 
        const privateKey = Buffer.from(`${config.get<string>(keyName)}`, 'base64').toString('ascii')
        return jwt.sign(payload, privateKey, 
            {...(options && options), algorithm: 'RS256', allowInsecureKeySizes: true})
    }

export const verifyJwt = <T>(
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"): T | null => { 
        try { 
            const publicKey = Buffer.from(`${config.get<string>(keyName)}`, 'base64').toString('ascii')
            const decoded = jwt.verify(token, publicKey) as T 
            return decoded
        } catch (error) {
            return null
        }        
    }