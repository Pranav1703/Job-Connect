import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import { Request, Response, NextFunction } from 'express';

export const isAuthorized = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{

    try {
        const secret =  process.env.TOKEN_SECRET as string
    
        const {token} = req.cookies
        if(!token){
            return next(new Error("Token unavailable"))
        }
    
        const decodedToken = jwt.verify(token, secret) as jwt.JwtPayload

        const user = await User.findById(decodedToken._id).select("-password")
    
        if(!user){
            throw new Error("User unauthorized")
        }

        req.body.user = user
        next()

    } catch (error) {
        console.log(error)
    }

})