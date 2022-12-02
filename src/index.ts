import express,{Request,Response,NextFunction} from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieSession from "cookie-session";
import { userRouter } from './routes/userRouters';
import { productRouter } from './routes/productRouters';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config()

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

app.use(
    cookieSession({
      signed: false,
      secure: true,
    })
  );

app.use(userRouter)
app.use(productRouter)


app.use(errorHandler)

mongoose.connect(`mongodb+srv://${process.env.MONGO_CLUSTER}:${process.env.MONGO_PASSWORD}@cluster0.ylc0a.mongodb.net/?retryWrites=true&w=majority`)

app.listen(port,()=>{
    console.log("Server is running")
})

export{app}