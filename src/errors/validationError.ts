import { BaseError } from "./baseError";
import { ValidationError } from 'express-validator';

export class ValidationErrorRequest extends BaseError{
    statusCode: number = 400;

    constructor(public errors: ValidationError[]){
        super('Invalid request parameters');
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return this.errors.map(err=>{
            return {message:err.msg,field:err.param}
        })
    }  
    
}