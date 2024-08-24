import { ObjectId } from 'mongodb';
import {z} from 'zod';

export interface IProduct extends Document {
    id: ObjectId;
    title: string;
    photo: string;
    price: number;
    description: string;
    amount: number;
    category: string;
    tags: [string];
    sumOfStars: number;
    numOfVoters: number;
    rate: number;
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

export const zodCreateProduct = z.object({
    body: z.object({
        title: z.
        string({
            required_error: 'A product must have a title',
            invalid_type_error: 'The title must be a string'
        })
        .trim()
        .nonempty(),
        price: z.
        number({
            required_error: 'A product must have a price',
            invalid_type_error: 'The price must be a number'
        })
        .nonnegative(),
        description: z.
        string({
            invalid_type_error: 'The description must be a string',
        })
        .trim()
        .optional(),
        amount: z.
        number({
            required_error: 'A product must have an amount',
            invalid_type_error: 'The amount must be a number'
        })
        .nonnegative(),
        category: z.
        enum(["Drinks", "Sweets", "Coffee","Others"], {
            required_error: 'A product must have a category',
            invalid_type_error: 'category must be one of those ["Drinks", "Sweets", "Coffee","Others"]'
        }),
        tags: z.
        array(z.string(), {
            invalid_type_error: 'Tags must be an array of strings'
        })
        .optional()
    })
    .strict('Your request body must have just the following inputs: [title, price, amount, category]')
});
  

export const zodUpdateProduct = z.object({
    body: z.object({
        title: z.
        string({
            invalid_type_error: 'The title must be a string'
        })
        .trim()
        .nonempty()
        .optional(),
        price: z.
        number({
            invalid_type_error: 'The price must be a number'
        })
        .nonnegative()
        .optional(),
        description: z.
        string({
            invalid_type_error: 'The description must be a string',
        })
        .trim()
        .optional(),
        amount: z.
        number({
            invalid_type_error: 'The amount must be a number'
        })
        .nonnegative()
        .optional(),
        category: z.
        enum(["Drinks", "Sweets", "Coffee","Others"], {
            invalid_type_error: 'category must be one of those ["Drinks", "Sweets", "Coffee","Others"]'
        })
        .optional(),
        tags: z.
        array(z.string(), {
            invalid_type_error: 'Tags must be an array of strings'
        })
        .optional()
    })
    .strict('Your request body may have just the following inputs: [title, price, amount, category]')
})




