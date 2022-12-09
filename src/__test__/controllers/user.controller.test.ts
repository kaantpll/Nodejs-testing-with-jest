import request  from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {app} from '../../index'
import { Constants } from '../../constants'
import { BadRequest } from '../../errors/badRequestError'
import { register } from '../../controllers/userControllers'
import { ObjectId } from 'mongodb'
import {Request,Response} from 'express'

dotenv.config()

const fakeUser ={
    email:"examples1a23@com.tr",
    password:"1234567",
    username:"kaantpllld",
    firstname:"kaan",
    age:23
}


const mockRequest = {
  params: {
      id: new ObjectId("6385e608af2a29cdf4b4d882")
  },
  body:{
    email:"kaant43@gmail.com"
  }
} as unknown as Request;


const mockResponse = {
  body: {
      firstName: 'Kaan',
  },
} as unknown as Response;


describe('User tests',()=>{

    beforeEach(async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_CLUSTER}:${process.env.MONGO_PASSWORD}@cluster0.ylc0a.mongodb.net/?retryWrites=true&w=majority`);
    });
  
    afterEach(async () => {
    await mongoose.connection.close();
    });

    it('GET/users whenUserGetUserListMethodWithOutAuthorizationHeader_itShouldReturnUserNotAuthErrorMessageWith_401_StatusCode', async() => { 
        const res =  await request(app).get("/api/v1/users")

            expect(res.statusCode).toBe(401);
            expect(res.body.errors).toBe(Constants.USER_NOT_AUTH)
       
    }),

    it('GET/users whenUserGetUserListMethodWithAuthorizationHeader_itShouldReturnUserListWith_200_StatusCode',async()=>{
        const res =  await request(app)
        .get("/api/v1/users")
        .set('Authorization', 'TokenKey') 
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe(Constants.USER_GET_LIST)
    })

    it('POST/users/login whenUserLoginRequestMethod_itShouldReturnLoginSuccessMessageWith_200_StatusCode',async()=>{
       const res= await request(app)
       .post("/api/v1/users/login")
       .set('Accept', 'application/json')
       .expect('Content-Type', /json/)
       .send(fakeUser)
       
       expect(res.statusCode).toBe(200);
       expect(res.body.message).toBe(Constants.USER_LOGIN_SUCCESS)
    })

    it('POST/users/register whenUserRequestRegisterMethod_itShouldReturnSuccessRegisterMessageWith_201_StatusCode',async()=>{
        const res= await request(app)
        .post("/api/v1/users/register")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          email:"examples1afk23@com.tr",
          password:"1234567",
          username:"kaantpllld8ok",
          firstname:"kaan",
          age:26
        })
    
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe(Constants.USER_REGISTER_SUCCESS)
      
     })
     it('POST/users/register whenUserRequestRegisterMethodWithValidBody_itShouldThrowErrorMessageWithBy_400_StatusCode',async()=>
     {
      await expect(()=>register(mockRequest,mockResponse)).rejects.toThrow(new BadRequest(Constants.USER_ALREADY_EXIST))
     })
})