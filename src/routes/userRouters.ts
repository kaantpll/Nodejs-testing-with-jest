import express from 'express'
import { body } from 'express-validator';
import { login, register,getUsers } from '../controllers/userControllers';
import authMiddleware from '../middlewares/auth';
import validateMiddleWare from '../middlewares/validateMiddleware';

const router = express.Router()

router.get('/api/v1/users',authMiddleware,getUsers)

router.post('/api/v1/users/login',
[
    body('email').
    isEmail().
    withMessage('Email must be valid'),
]
,validateMiddleWare,
login
)
router.post('/api/v1/users/register',
[
    body('email').
    isEmail().
    withMessage('Email must be valid')
],
validateMiddleWare,
register)


export {router as userRouter}
