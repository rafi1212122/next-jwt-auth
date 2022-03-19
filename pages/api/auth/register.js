import bcrypt from "bcryptjs"
import 'dotenv/config'
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if(req.method != 'POST'){
        res.status(405).json({ message: 'only POST request allowed' }).end()
    }
    if(!req.body.username||!req.body.password){
        res.status(400).json({ message: 'username and password required' }).end()
    }
    const { username, password } = req.body
    if(username.includes(' ')||password.includes(' ')){
        res.status(400).json({ message: 'username and password cant have whitespaces' })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPass = bcrypt.hashSync(password, salt)
    try {
        const uri = process.env.MONGODB_URI;
        const client = await MongoClient.connect(uri)
        const db = client.db("auth-test").collection("users")
        await db.findOne({
            username
        }).then((result) =>{
            if(result){
                res.status(400).json({ message: 'username already in use' }).end()
            }
        })
        await db.insertOne({
            username,
            password:hashedPass
        })
        res.status(200).json({ 
            message: 'registered successfully!'
        }).end()
    } catch (error) {
        res.status(500).send({ message: `DB connction error: ${error}` }).end()
    }
}