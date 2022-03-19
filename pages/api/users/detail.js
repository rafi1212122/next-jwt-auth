import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const authSplit = req.headers.authorization.split(' ')
    const decodedToken = jwt.verify(authSplit[1], process.env.JWT_SECRET_KEY)
    try {
        const uri = process.env.MONGODB_URI;
        const client = await MongoClient.connect(uri)
        const db = client.db("auth-test").collection("users")
        const user = await db.findOne({
            _id: ObjectId(decodedToken.id)
        })
        if(!user){
            res.status(401).json({ 
                message: 'user not found'
            })
        }
        res.status(200).json({
            message:'success',
            data: user
        })
    } catch (error) {
        res.status(500).send({ message: `${error}` })
    }
}