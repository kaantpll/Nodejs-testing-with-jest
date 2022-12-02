import {Response,Request} from 'express'
import { Constants } from '../constants'
import { BadRequest } from '../errors/badRequestError'
import { ProductNotFound } from '../errors/productNotFound'
import { Product } from '../models/product'

const getAllProduct = async(req:Request,res:Response)=>{
    res.status(200).json({message:Constants.PRODUCT_LISTED,data:await Product.find()})
}

const getOneProductWithProductId = async(req:Request,res:Response)=>{
    const product = await Product.findOne({_id:req.params.id})
    
    if(!product) throw new ProductNotFound(Constants.PRODUCT_NOT_FOUND)
    
    res.status(200).json({message:Constants.PRODUCT_LISTED_BY_ID,data:product})
}

const createNewProduct = async(req:Request,res:Response)=>{
   const product = Product.build({...req.body})
   await product.save()
   
   res.status(201).json({message:Constants.PRODUCT_CREATED,data:product})
}

const updateProduct = async(req:Request,res:Response)=>{

    const updateProduct = await Product.updateOne({_id:req.params.id,$set:{
        productName:req.body.productName,
        productSaler:req.body.productSaler,
        productStock:req.body.productStock
    }})
    
    res.status(200).json({message:Constants.PRODUCT_UPDATED,data:updateProduct})
}

const deleteProduct = async(req:Request,res:Response)=>{
    const deleteProduct = await Product.deleteOne({_id:req.params.id})
    
    if(!deleteProduct) throw new ProductNotFound(Constants.PRODUCT_NOT_FOUND)
   
    res.status(200).json({message:Constants.PRODUCT_DELETED})
}


export {
    getAllProduct,
    getOneProductWithProductId,
    createNewProduct,
    updateProduct,
    deleteProduct,
}