import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.js"


export const signUp = asyncHandler( async(req,res,next)=>{
    console.log(req.body)
    const {username, role, email, password} = req.body  

    const emailcheck = await User.find({email})
    console.log("check:",emailcheck)

    if(!emailcheck){
        res.json({
            msg: null,
            err: "email already exists"
        })
        next(new Error("email already registered"))
        return
    }
    
    const user = await User.create({
        username,
        role,
        email,
        password
    })

    const token = user.generateToken()

    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .status(200)
    .cookie("token",token,options)
    .json({
        msg: "success",
        err: null
    })
    

    
})

export const login = asyncHandler(async(req,res,next)=>{

    const {email, password} = req.body

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        res.json({
            msg: null,
            err: "user not found"
        })
        next()
        return
    }

    const passwordMatch =  await user.checkPassword(password)
    if(!passwordMatch){
        res.json({
            msg: null,
            err: "password incorrect"
        })
        next() 
        return
    }

    const token = user.generateToken()
    
    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .status(200)
    .cookie("token",token,options)
    .json({
        msg: "success",
        role: user.role,
        err: null
    })
    
})

export const logOut = asyncHandler(async(req,res)=>{

    const options = {
        httpOnly: true,
        secure: true
    }
    
    res
    .status(200)
    .clearCookie('token',options)
    .json({
        msg:"logged out"
    })
})