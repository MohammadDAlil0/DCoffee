import { NextFunction, Response } from "express";
import IRequest from "../../express/expressInterfaces";
import catchAsync from "../../utils/catchAsync";
import { createOne, deleteOne, getAll, getOne, updateOne } from '../../repositories/mainFactory';
import Cart from "./cartModel";
import Product from "../product/productModel";
import AppError from "../../utils/appError";
import { IUser } from "../user/userSchema";

const getAllCarts = getAll(Cart);

const addToCart = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new AppError('There is no such product haveing this ID', 404));
    }
    const cart = await Cart.findByIdAndUpdate(req.user?.cartId, {
        $push: {
            products: {
                product: product._id,
                amount: 1,
                price: product.price
            }
        }
    }, {
        new: true
    });
    if (!cart) {
        return next(new AppError('Unable to find the cart', 500));
    }
    res.status(200).json({
        status: 'success',
        message: 'Added to cart successfuly'
    });
});

const getCart = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findOne({_id: req.user?.cartId, status: 'cart'}).populate('products.product');
    if (!cart) {
        return next(new AppError('The cart is not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: cart
    });
});

const updateCart = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findOneAndUpdate({_id: req.user?.cartId, status: 'cart'}, req.body, {
        new: true,
        runValidators: true
    });
    if (!cart) {
        return next(new AppError('The cart is not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: cart
    });
});


const buyCart = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findOneAndUpdate({_id: req.user?.cartId, status: 'cart'}, {
        $set: {
            status: 'On-Going',
            adress: req.body.adress
        }
    });

    if (!cart) {
        next(new AppError('The cart is not found', 404));
    }
    
    const curUser: IUser = req.user!;
    const newCart = await Cart.create({userId: curUser.id});
    curUser.cartId = newCart.id;
    await curUser.save({runValidator: false});

    res.status(200).json({
        status: 'success',
        message: 'Your request has been sent to the shop, please check your notifications after few minutes'
    });

});

const acceptCart = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findOneAndUpdate({_id: req.params.id, status: 'On-Going'}, {
        $set: {
            status: 'On-Way',
            dateToDelivered: new Date(req.body.dataToDelivered)
        }
    }, {
        new: true
    });
    console.log(cart);

    if (!cart) {
        next(new AppError('The cart is not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: `Your request on the way. Please get your request in ${cart?.adress} at ${cart?.dateToDelivered}`
    });
});

const cancelCart = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: {
            status: 'rejected',
            reason: req.body.reason
        }
    }, {
        new: true
    });

    if (!cart) {
        next(new AppError('The cart is not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: `Your cart has been rejected, reason: ${cart?.reason}`
    });
});

const deliveredCart = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findOneAndUpdate({_id: req.params.id, status: 'On-Way'}, {
        $set: {
            status: 'delivered',
            deliverdTime: Date.now()
        }
    }, {
        new: true
    });

    if (!cart) {
        next(new AppError('The cart is not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: `The order delivered at ${cart?.deliverdTime}`
    });
});

export default {
    getAllCarts,
    getCart,
    updateCart,
    addToCart,
    buyCart,
    acceptCart,
    cancelCart,
    deliveredCart
}