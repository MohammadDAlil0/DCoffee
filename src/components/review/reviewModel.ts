import mongoose, { Schema, Document, Model, Query } from "mongoose";
import Product from '../product/productModel';
import { IReview, IReviewModel, IReviewQuery } from "./reviewSchema";

const reviewSchema: Schema<IReview> = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review cannot be empty!']
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'A review must have a product.']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A review must have a user.']
    }
});

// Create a unique index to prevent a user from reviewing the same product more than once
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Pre-hook to populate user details before executing a find query
reviewSchema.pre(/^find/, function (this: mongoose.Query<IReview, IReview>, next) {
    return next();
    this.populate({
        path: 'userId',
        select: "name photo"
    });
    next();
});

// Define the static method to calculate average ratings
reviewSchema.statics.calcAverageRatings = async function (productId: mongoose.Types.ObjectId) {
    const stats = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5 // Assuming 4.5 as a default average rating
        });
    }
};

// Post-save hook to recalculate average ratings after a review is saved
reviewSchema.post('save', function (this: IReview) {
    (this.constructor as IReviewModel).calcAverageRatings(this.productId);
});

// Pre-hook to store the document before a findOneAnd* operation
reviewSchema.pre(/^findOneAnd/, async function (this: IReviewQuery, next) {
    console.log('I amhere');
    // this.r = await this.findOne();
    next();
});

// Post-hook to recalculate average ratings after a findOneAnd* operation
reviewSchema.post(/^findOneAnd/, async function (this: IReviewQuery) {
    return;
    // if (this.r) {
    //     await (this.r.constructor as IReviewModel).calcAverageRatings(this.r.productId);
    // }
});

// Create the Review model using the schema and the interface
export default mongoose.model<IReview, IReviewModel>('Review', reviewSchema);


