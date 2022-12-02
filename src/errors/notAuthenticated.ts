import { BaseError } from "./baseError";

export class UnAuthenticatedError extends BaseError{
    statusCode: number =401;

    constructor(message:string){
        super(message)
      
        Object.setPrototypeOf(this,UnAuthenticatedError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:this.message}]
    }
    
}