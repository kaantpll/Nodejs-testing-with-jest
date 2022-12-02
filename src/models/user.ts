import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser{
    username:string,
    firstname:string,
    email:string,
    password:string,
    age:number,
}

interface UserDoc extends mongoose.Document{
    username:string,
    firstname:string,
    email:string,
    password:string,
    age:number,
}

interface UserModel extends mongoose.Model<UserDoc>{
    build(userBody:IUser) : UserDoc
}

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    }
},{
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  })

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
     const hashedPasword = await bcrypt.hash(this.get('password'),12)
     this.set('password',hashedPasword)
    }
    done();
  });

userSchema.statics.build = (userBody: IUser) => {
    return new User(userBody);
  };

const User = mongoose.model<UserDoc,UserModel>('User', userSchema);

export {User}