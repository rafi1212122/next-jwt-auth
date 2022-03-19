import bcrypt from "bcryptjs"
import 'dotenv/config'
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    if(req.method != 'POST'){
        res.status(405).json({ message: 'only POST request allowed' })
    }
    if(!req.body.username||!req.body.password){
        res.status(400).json({ message: 'username and password required' })
    }
    const { username, password } = req.body
    if(username.includes(' ')||password.includes(' ')){
        res.status(400).json({ message: 'username and password cant have whitespaces' })
    }
    try {
        const uri = process.env.MONGODB_URI;
        const client = await MongoClient.connect(uri)
        const db = client.db("auth-test").collection("users")
        const user = await db.findOne({
            username
        })
        if(!user){
            res.status(401).json({ 
                message: 'user not found'
            })
        }
        const validatePassword = await bcrypt.compare(password, user.password)
        if(validatePassword){
            const token = jwt.sign({
                id:user._id,
                username:user.username
            }, process.env.JWT_SECRET_KEY, {
                expiresIn:'3d'
            })
            res.status(200).json({ 
                message: 'logged in successfully!',
                token
            })
        }else{
            res.status(401).json({ 
                message: 'invalid password!'
            })
        }
    } catch (error) {
        res.status(500).send({ message: `${error}` })
    }
}