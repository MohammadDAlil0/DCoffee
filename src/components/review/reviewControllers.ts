import { NextFunction, Response } from "express";
import IRequest from "../../express/expressInterfaces";
import catchAsync from "../../utils/catchAsync";
import { deleteOne, getAll, getOne, updateOne } from '../../repositories/mainFactory';
import Review from "./reviewModel";

const createReview = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    req.body.userId = req.user?.id;
    let doc = await Review.findOneAndUpdate({userId: req.body.userId, productId: req.body.productId}, {
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

const getAllReviews = getAll(Review);
const getReview = getOne(Review);
const deleteReview = deleteOne(Review);

export default {
    getAllReviews,
    createReview,
    getReview,
    deleteReview
}