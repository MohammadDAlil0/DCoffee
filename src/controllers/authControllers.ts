import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import catchAsync from "../utils/catchAsync";
import User from '../models/userModel';
import IUser from '../interfaces/userInterface';
import AppError from '../utils/appError';

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            id: user.id,
            name: user.name,
            role: user.role
        }
    });
}

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);
    createSendToken(user, 201, res);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email}).select('+password');
    if (!user || !await bcrypt.compare(password, user.password)) {
        return next(new AppError('Invalid email or password', 400));
    }
    res.status(200).json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            role: user.role
        }
    })
});