import {Request,Response} from 'express'
import { BadRequest } from '../errors/badRequestError'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'
import { UserNotFound } from '../errors/userNotFound'
import bcrypt from 'bcrypt'
import { PasswordNotHashed } from '../errors/passwordNotValid'
import { Constants } from '../constants'

const register= async(req:Request,res:Response)=>{

    const {email,password,username,age,firstname}= req.body

    const isUserExist =await User.findOne({email})

    if(isUserExist){
        throw new BadRequest(Constants.USER_ALREADY_EXIST)
    }

    const user = User.build({email,password,username,age,firstname})
    await user.save();

    const jwtToken = jwt.sign({email: user.email},process.env.SECRET_KEY!)

    req.session={
        jwt: jwtToken
    }
    
    res.status(201).json({message:Constants.USER_REGISTER_SUCCESS,data:{email,username,token:jwtToken}})
}

const login = async(req:Request,res:Response)=>{
    const {email,password}=req.body

    const user =await User.findOne({email})

    if(!user){
        throw new UserNotFound(Constants.USER_NOT_FOUND)
    }

    const comparedPassword = await bcrypt.compare(password.toString(),user.password)

    if(!comparedPassword){
        throw new PasswordNotHashed('Password not hashed')
    }

    const jwtToken = jwt.sign({email: user.email},process.env.SECRET_KEY!)
    
    req.session={
        jwt: jwtToken
    }

    res.status(200).json({message:Constants.USER_LOGIN_SUCCESS});
}

const getUsers= async(req:Request,res:Response)=>{
  
    const userList =await User.find();
    
    res.status(200).json({message:Constants.USER_GET_LIST,data:userList})
}

export {
    register,
    login,
    getUsers
}