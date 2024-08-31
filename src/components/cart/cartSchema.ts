import { ObjectId } from 'mongodb';
import {z} from 'zod';

export interface ICart extends Document {
    id: ObjectId,
    userId: ObjectId,
    status: string,
    dateToDelivered: Date,
    products: [{
        product: ObjectId,
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
    body: z.object({
        products: z.array(
            z.object({
                product: z.string({
                    required_error: 'A product must have a product ID'
                })
                .refine((val) => {
                    return ObjectId.isValid(val);
                }, {
                    message: "Invalid Product's ID"
                }),
                amount: z.
                number({
                    invalid_type_error: 'The amount must be a number',
                    required_error: 'A product must have an amount'
                })
                .nonnegative()
            })
            .strict("The array of products must consists of only [product, amount]"),
            {
                invalid_type_error: 'products must be an array',
                required_error: 'Your request must have products'
            }
        )
    })
    .strict("Your request body must just have an array of products")
});