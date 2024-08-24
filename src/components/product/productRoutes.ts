import express from 'express';
import authControllers from '../auth/authControllers';
import validator from '../../utils/zod';
import productControllers from './productControllers';
import { zodCreateProduct, zodUpdateProduct, zodValidateID } from './productSchema';

const router: express.Router = express.Router();

router.route('/')
.get(productControllers.getAllProducts)
.post(
    authControllers.protect, 
    authControllers.restrictAdmin, 
    validator(zodCreateProduct), 
    productControllers.createProduct
);

router.route('/:id')
.get(validator(zodValidateID), productControllers.getProduct)
.patch(
    validator(zodValidateID),
    authControllers.protect, 
    authControllers.restrictAdmin, 
    validator(zodUpdateProduct), 
    productControllers.updateProduct
)
.delete(
    validator(zodValidateID),
    authControllers.protect, 
    authControllers.restrictAdmin, 
    productControllers.deleteProduct
);

export default router;