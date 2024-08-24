import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Query } from 'mongoose';
import { Model } from 'mongoose';
import {z} from 'zod';

export interface IReview extends Document {
    review: string,
    rating: number,
    createdAt: Date,
    productId: ObjectId,
    userId: ObjectId
};

export interface IReviewModel extends Model<IReview> {
    calcAverageRatings(productID: mongoose.Types.ObjectId): Promise<void>;
}

export interface IReviewQuery extends Query<IReview, IReview> {
    r?: IReview | null; // Custom property to hold the review document
}

export const zodCreateReciew = z.object({
    body: z.object({
        review: z.
        string({
            required_error: 'Review cannot be empty!',
            invalid_type_error: 'The review must be a string'
        })
        .trim()
        .nonempty(),
        rating: z.
        number({
            required_error: 'A review must have a rating',
            invalid_type_error: 'The rating must be a number'
        })
        .min(1, 'Rating must be above 1.0')
        .max(8, 'Rating must be below 5.0'),
        productId: z.
        string()
        .refine((val: any) => {
            return ObjectId.isValid(val);
        }, {
            message: "Invalid ProductId"
        })
    })
    .strict('Your request body must have just the following inputs: [review, rating]')
});

export const zodUpdateReview = z.object({
    body: z.object({
        review: z.
        string({
            invalid_type_error: 'The review must be a string'
        })
        .trim()
        .nonempty()
        .optional(),
        rating: z.
        number({
            invalid_type_error: 'The rating must be a number'
        })
        .min(1, 'Rating must be above 1.0')
        .max(8, 'Rating must be below 5.0')
        .optional()
    })
    .strict('Your request body must have just the following inputs: [review, rating]')
});

