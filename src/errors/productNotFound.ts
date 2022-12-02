import { BaseError } from "./baseError";

export class ProductNotFound extends BaseError{
    statusCode: number = 404;

    constructor(message:string){
        super(message)

        Object.setPrototypeOf(this,ProductNotFound.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
       return [{message:this.message}]
    }
    
}