import {Response, NextFunction} from 'express';
import IRequest from '../../express/expressInterfaces';
import catchAsync from "../../utils/catchAsync";
import Product from './productModel';
import {IUser} from '../user/userSchema';
import AppError from '../../utils/appError';
import APIFeatures from '../../utils/apiFeatures';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../../repositories/mainFactory';

const createProduct = createOne(Product);
const getAllProducts = getAll(Product);
const getProduct = getOne(Product);
const updateProduct = updateOne(Product);
const deleteProduct = deleteOne(Product);

export default {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}