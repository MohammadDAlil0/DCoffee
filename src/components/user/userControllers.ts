import {Response, NextFunction} from 'express';
import IRequest from '../../express/expressInterfaces';
import catchAsync from "../../utils/catchAsync";
import User from './userModel';
import {IUser} from './userSchema';
import AppError from '../../utils/appError';
import { deleteOne, getOne, updateOne } from '../../repositories/mainFactory';

const getProfile = getOne(User);
const updateProfile = updateOne(User);
const deleteUser = deleteOne(User);
const getUser = getOne(User);

const changeRole = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        role: req.body.role
    },{
        runValidators: false,
        new: true
    });
    if (!user) {
        next(new AppError('User not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: user
    });
});

export default {
    getProfile,
    updateProfile,
    changeRole,
    deleteUser,
    getUser
};