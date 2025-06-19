import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet"
import dotenv from 'dotenv';
import jewete from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";



dotenv.config()

const prisma = new PrismaClient();

const buatToken = (userId, role)=>{
    return jewete.sign({id: userId, role}, process.env.JWT_RAHASIA, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const app = express()
app.use(helmet())
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(cookieParser())


app.post('/auth/register', async (req, res)=>{
    

    try {

        const {username, password, role} = req.body

        const checkUsername =  await prisma.user.findUnique({
            where:{username}
        })

        if (checkUsername) {
            return res.status(409).json({ message: "Username sudah digunakan" }); 
        }

        if (!username || !password || !role) {
            return res.status(400).json({ message: "Semua field wajib diisi" });
        }



        if (!["ADMIN", "USER"].includes(role)) {
            return res.status(400).json({ message: "Role tidak valid" });
        }

        if (password.length < 8 ) {
            return res.status(400).json({ message: "Password Terlalu Singkat" });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10)
        const users = await prisma.user.create({data:{
            username,
            password: hashedPassword, 
            role
        }})

        res.status(201).json({message: "Succesfully Authenticate"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Registrasi gagal',
            detail: error.message 
        });
    }
}) 

app.post('/auth/login', async (req, res)=>{
    const {username, password} = req.body

    try {
        const user = await prisma.user.findUnique({
            where:{username}
        })

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: "Username or Password invalid"})
        }

        const token = buatToken(user.id, user.role);

        res.cookie("token", token, {httpOnly:true, sameSite:"strict", maxAge:1000*60})//satuan milisecond
        res.json({redirectUrl: user.role == "ADMIN"? "/admin"  : "/user", message:"Login succeed"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Registrasi gagal',
            detail: error.message 
        });
    }
})

app.delete('/auth/logout', (req, res)=>{
    try {
        res.clearCookie('token')
        res.json({message: "Logout Successfully"})
    } catch (message) {
        return res.json({message: message})
    }    
})

const authenticate = async (req,res, next)=>{
    const token=  req.cookies.token
    if(!token) return res.status(401).json({message: "Required authenticate"})
        try {
            const decoded = jewete.verify(token, process.env.JWT_RAHASIA)
            const user = await prisma.user.findUnique({where:{id:decoded.id}})
            if(!user) return res.status(404).json({message: "User Not Found"})
            req.user = decoded
            next()
        } catch (error) {
             return res.status(401).json({ error: 'Invalid token' }); 
    }
}

const otorisasiAdmin =  (req, res, next)=>{
    if(req.user.role !== 'ADMIN') return res.status(403).json({message:"Anda tidak punya akses"})
    next()
}

app.get("/auth/verify", authenticate, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

app.get('/user', authenticate, async (req, res)=>{
    try {
        const myData = await prisma.user.findUnique({
        where: {id: req.user.id}, 
        select:{id:true, username:true, role:true}
    })
        res.status(200).json(myData)
     } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
     }
})

app.get('/admin', authenticate, otorisasiAdmin, async (req, res)=>{
    try {
        const data = await prisma.user.findMany({select:{id:true, username: true, role: true}})
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users data' });
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
