import { User } from "@prisma/client"

export {}
// Make User in Prisma global to access every file
declare global {
    namespace Express {
        interface Request {
            User ?: User
        }
    }
}