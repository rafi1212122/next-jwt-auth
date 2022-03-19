import jwt from '@tsndr/cloudflare-worker-jwt'

export default async function middleware(req) {
    if(!req.headers.get('authorization')){
        return new Response(new Blob([JSON.stringify({ message: 'unauthorized access!' })], {type : 'application/json'}), { status:401 })
    }
    const authSplit = req.headers.get('authorization').split(' ')
    if(authSplit[0]!='Bearer'){
        return new Response(new Blob([JSON.stringify({ message: 'please use Bearer token!' })], {type : 'application/json'}), { status:400 })
    }
    const verifyToken = await jwt.verify(authSplit[1], process.env.JWT_SECRET_KEY)
    if(!verifyToken){
        return new Response(new Blob([JSON.stringify({ message: 'invalid token!' })], {type : 'application/json'}), { status:401 })
    }
}