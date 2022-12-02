import { NextFunction,Request,Response } from "express";
import { Constants } from "../constants";
import { UnAuthenticatedError } from "../errors/notAuthenticated";

const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{

    if(!req.header('Authorization')){
        throw new UnAuthenticatedError(Constants.USER_NOT_AUTH)
    }
    
    next();
}

export default authMiddleware;