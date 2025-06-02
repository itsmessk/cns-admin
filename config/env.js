import {config} from 'dotenv'

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    SERVER_URL,
    NODE_ENV

} = process.env;