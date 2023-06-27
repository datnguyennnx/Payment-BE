import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

export const auth = Router()

const prisma = new PrismaClient()

auth.post('/login', async (req, res) => { 
    const { username, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) {
        return res.status(400).json({ success: false, error: "Invalid credentials!"})
    } 

    try { 
        if (password ==  user.password) {
            const accessToken = jwt.sign({ userID: user.id}, "secret")
            return res.status(200).json({ success: true, accessToken: accessToken })
        } else { 
            return res.status(400).json({ success: false, error: "Invalid credentials!"})
        }
    } catch (err) {{
        return res.json(400).json({ success: false, error: "Internal Server Error!"})
    }}
})

auth.post('/register', async (req, res) => { 
    const { email, username, password } = req.body
    const result = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (result) {
        return res.status(400).json({ success: false, error: "User already exists!"})
    } 

    const user = await prisma.user.create({ 
        data: { 
            email: email,
            username: username,
            password: password
        }
    })

    const accessToken = jwt.sign({ userID: user.id}, "secret")

    return res.status(200).json({ success: true, accessToken: accessToken})
})

