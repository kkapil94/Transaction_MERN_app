import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"



export const register = async (req,res)=>{
    const {firstName,lastName,email,password} = req.body
    const userExists =await User.findOne({email:email})
    if(userExists){
        res.status(406).json({message:"user already exists"})
        return
    }
    
    const saltRounds = 10;
    const salt =await bcrypt.genSalt(saltRounds)
    const hashedPass = await bcrypt.hashSync(password,salt)

    const user = await User({email,password:hashedPass,firstName,lastName})
    const saveUser =await user.save()
    res.status(201).json({message:"user is created"})
    console.log(saveUser)

}


export const login = async (req,res)=>{
    const {email,password} = await req.body
    const user =await User.findOne({email:email})
    if(!user){
        res.status(406).json({message:"Credentials not found"})
        return
    }

    const matched = await bcrypt.compare(password,user.password)
    if(!matched){
        res.status(406).json({message:"enter valid credentials"})
        return
    }
    const payload = {
        username:user.email,
        _id:user._id
    }
    const token = jwt.sign(payload,"some secret")
    res.json({message:"successfully created token ",token,user})

}