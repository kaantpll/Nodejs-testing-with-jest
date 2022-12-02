import express from 'express'
import { createNewProduct, deleteProduct, getAllProduct, getOneProductWithProductId, updateProduct } from '../controllers/productControllers';

const router = express.Router();

router.get('/api/v1/products',getAllProduct)
router.get('/api/v1/products/:id',getOneProductWithProductId)
router.post('/api/v1/products',createNewProduct)
router.put('/api/v1/products/:id',updateProduct)
router.delete('/api/v1/products/:id',deleteProduct)

export {router as productRouter}