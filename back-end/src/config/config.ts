import * as dotenv from "dotenv"
dotenv.config();
export const Env = {
    port: process.env.PORT,
    db: {
        url: process.env.DB_URL,
    },
    jwtSecret: process.env.JWT_SECRET,
    env: process.env.NODE_ENV,
}