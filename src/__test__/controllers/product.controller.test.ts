import request  from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {app} from '../../index'
import { PRODUCT_CREATED, PRODUCT_DELETED, PRODUCT_LISTED, PRODUCT_LISTED_BY_ID, PRODUCT_NOT_FOUND, PRODUCT_UPDATED } from '../../constants'
import { getOneProductWithProductId} from '../../controllers/productControllers'
import { BadRequest } from '../../errors/badRequestError'
import {Request,Response} from 'express'
import { ObjectId } from 'mongodb'

dotenv.config()

const productId='63889214b5ed277ae8f800cf'

const fakeProduct ={
    productName:"product name",
    productSaler:"kaantpll",
    productStock:50
}

const mockRequest = {
    params: {
        id: new ObjectId("6385e608af2a29cdf4b4d882")
    }
} as unknown as Request;

const mockResponse = {
    body: {
        firstName: 'Kaan',
    },
} as unknown as Response;


describe('Product controller tests',()=>{

    beforeEach(async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_CLUSTER}:${process.env.MONGO_PASSWORD}@cluster0.ylc0a.mongodb.net/?retryWrites=true&w=majority`);
  });
  
  afterEach(async () => {
    await mongoose.connection.close();
  });


    it('GET/products whenGetProductListRequestMethod_itShouldReturnProductListWith_200_StatusCode', async() => { 
        const res =  await request(app).get("/api/v1/products")

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe(PRODUCT_LISTED)
    }),

    it('GET/products/:id whenGetProductListRequestMethod_itShouldThrowProductNotFound_400_StatusCode',async()=>{
     await expect(()=>getOneProductWithProductId(mockRequest,mockResponse)).rejects.toThrow(new BadRequest(PRODUCT_NOT_FOUND))

    })

    it('GET/products/:id givenProductId_whenGetProductWithByProductId_itShouldReturnProductListWith_200_StatusCode',async()=>{
       const res= await request(app).get("/api/v1/products/"+productId)

       expect(res.statusCode).toBe(200) 
       expect(res.body.message).toBe(PRODUCT_LISTED_BY_ID)
    })

    it('POST/prdoucts givenProductData_whenCreateANewProduct_itShouldReturnProductMessageAndOwnOfProductWith_201_StatusCode',async()=>{
       const res= await request(app)
       .post("/api/v1/products")
       .set('Accept', 'application/json')
       .expect('Content-Type', /json/)
       .send(fakeProduct)
       
       expect(res.statusCode).toBe(201);
       expect(res.body.message).toBe(PRODUCT_CREATED)
    })

    it("PUT/products/:id givenProductData_whenUpdateProductWithId_itShouldReturnProductUpdatedMessageWith_200_StatusCode",async()=>{
       const res = await request(app)
       .put('/api/v1/products/'+productId)
       .set('Accept', 'application/json')
       .expect('Content-Type', /json/)
       .send(
        {productName:"product 0",
        productSaler:"kaantpll",
        productStock:51})

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe(PRODUCT_UPDATED)
    })

    it("DELETE/products/:id givenProductId_whenDeleteWithProductId_itShouldReturnProductDeletedMessageWith_200_StatusCode",async()=>{
        const res = await request(app).delete("/api/v1/products/"+productId)
        
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe(PRODUCT_DELETED)
    })
})