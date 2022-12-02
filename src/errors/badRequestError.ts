import { BaseError } from "./baseError";

export class BadRequest extends BaseError{
    
    statusCode: number=400;

    constructor(message:string){
        super(message)
        
        Object.setPrototypeOf(this,BadRequest.prototype)
    }
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:this.message}]
    }
    
}