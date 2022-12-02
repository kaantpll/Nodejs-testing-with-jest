import { BaseError } from "./baseError";

export class PasswordNotHashed extends BaseError{
    statusCode: number=400;

    constructor(message:string){
        super(message)

        Object.setPrototypeOf(this,PasswordNotHashed.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:this.message}]
    }
    
}