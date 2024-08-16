import {Response, NextFunction} from 'express';
import IRequest from '../../express/expressInterfaces';
import catchAsync from "../../utils/catchAsync";
import User from '../user/userModel';
import {IUser} from '../user/userSchema';
import AppError from '../../utils/appError';

const getProfile = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
        status: 'success',
        data: req.user
    });
});

const updateProfile = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.user?.id, req.body, {
        runValidators: false,
        new: true
    });
    res.status(200).json({
        status: 'success',
        data: user
    })
});

const changeRole = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.body.userID, {
        role: req.body.role
    },{
        runValidators: false,
        new: true
    });
    res.status(200).json({
        status: 'success',
        data: user
    });
});

const deleteUser = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.body.userID);
    res.status(204).json({
        status: 'success'
    });
});

export default {
    getProfile,
    updateProfile,
    changeRole,
    deleteUser
};