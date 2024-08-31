import { NextFunction, Response } from "express";
import IRequest from "../../express/expressInterfaces";
import catchAsync from "../../utils/catchAsync";
import { deleteOne, getAll, getOne, updateOne } from '../../repositories/mainFactory';
import Review from "./reviewModel";

const createReview = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    req.body.userId = req.user?.id;
    let doc = await Review.findOneAndUpdate({userId: req.body.userId, productId: req.params.productId}, {
        review: req.body.review,
        rating: req.body.rating
    }, {
        new: true
    });
    if (!doc)
        doc = await Review.create(req.body);
    res.status(201).json({
        status: 'success',
        data: doc
    }); 
});

const getReviews = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    let reviews = await Review.find({userId: req.user?.id, productId: req.params.productId});
    res.status(201).json({
        status: 'success',
        result: reviews.length,
        data: reviews
    }); 
});
const deleteReview = deleteOne(Review);

export default {
    createReview,
    getReviews,
    deleteReview
}