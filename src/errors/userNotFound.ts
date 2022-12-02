import { BaseError } from "./baseError";

export class UserNotFound extends BaseError{
    statusCode: number=404;

    constructor(message:string){
        super(message)

        Object.setPrototypeOf(this,UserNotFound.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:this.message}]
    }

}