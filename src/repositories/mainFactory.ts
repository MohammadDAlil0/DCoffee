import { Model } from "mongoose";
import catchAsync from "../utils/catchAsync";
import IRequest from "../express/expressInterfaces";
import { NextFunction, Response } from "express";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";
import { ObjectId } from "mongodb";

export const createOne = (Model: Model<any>) => catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: doc
    });
});

export const getOne = (Model: Model<any>, populateOptions: [string] | undefined = undefined) => catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const id: string | ObjectId | undefined = req.params.id || req.user?.id;
    const query = Model.findById(id);
    if (populateOptions) query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }   
    res.status(200).json({
        status: 'success',
        data: doc
    });
});

export const getAll = (Model: Model<any>) => catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const freatures = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .pagination();
    
    const docs = await freatures.query;

    res.status(200).json({
        status: 'success',
        result: docs.length,
        data: docs
    });
});

export const updateOne = (Model: Model<any>) => catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const id: string | ObjectId | undefined = req.params.id || req.user?.id;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc
    });
});

export const deleteOne = (Model: Model<any>) => catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const id: string | ObjectId | undefined = req.params.id || req.user?.id;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});