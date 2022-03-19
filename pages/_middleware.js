import jwt from '@tsndr/cloudflare-worker-jwt'
import { NextResponse } from 'next/server'

export default async function middleware(req) {
    const domain = req.url.split('/')[2]
    if(req.url.split('/')[3]=='api'){
        return
    }
    if(!req.cookies._token){
        if(req.page.name=='/login'||req.page.name=='/register'){
            return
        }
        return NextResponse.redirect(`http://${domain}/login`)
    }else{
        if(req.page.name=='/login'||req.page.name=='/register'){
            return NextResponse.redirect(`http://${domain}/`)
        }
        const verifyToken = await jwt.verify(req.cookies._token, process.env.JWT_SECRET_KEY)
        if(verifyToken){
            return
        }else{
            return NextResponse.redirect(`http://${domain}/api/auth/clearcookies`)
        }
    }
}