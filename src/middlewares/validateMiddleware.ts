import { NextFunction ,Request,Response} from "express"
import {validationResult} from 'express-validator'
import { ValidationErrorRequest } from "../errors/validationError"

const validateMiddleWare=(req:Request,res:Response,next:NextFunction)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new ValidationErrorRequest(errors.array())
    }
    next()
}

export default validateMiddleWare