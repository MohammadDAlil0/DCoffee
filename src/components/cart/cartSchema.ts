import { ObjectId } from 'mongodb';
import {z} from 'zod';

export interface ICart extends Document {
    id: ObjectId,
    userId: ObjectId,
    status: string,
    dateToDelivered: Date,
    products: [{
        productID: ObjectId,
        amount: number,
        price: number
    }],
    createdAt: Date,
    adress: string,
    reason: string,
    deliverdTime: Date,
    save(options: object): any;
};

export const zodValidateID = z.object({
    params: z.object({
        id: z
        .string()
        .refine((val) => {
            return ObjectId.isValid(val);
        }, {
            message: 'Invalid ObjectID'
        })
    })
});

export const zodUpdateCart = z.object({
    products: z.array(z.object({
        amount: z.
        number({
            invalid_type_error: 'The amount must be a number'
        })
        .nonnegative(),
        price: z.
        number({
            invalid_type_error: 'The amount must be a number'
        })
        .nonnegative()
    }))
});

export const zodAddToCart = z.object({
    body: z.object({
        productId: z.
        string()
        .refine((val) => {
            return ObjectId.isValid(val);
        }, {
            message: 'Invalid ObjectID, check the product ID'
        })
    })
});