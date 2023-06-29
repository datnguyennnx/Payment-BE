import * as dotenv from 'dotenv'
dotenv.config()

export default {
    origin: 'http://localhost:8000',
    redisCacheExpiresIn: 60,
    refreshTokenExpiresIn: 60,
    accessTokenExpiresIn: 15,
    accessTokenPrivateKey: `${process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY}`,
    accessTokenPublicKey: `${process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY}`,
    refreshTokenPrivateKey: `${process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY}`,
    refreshTokenPublicKey: `${process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY}`,
}

