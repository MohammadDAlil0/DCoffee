import {Response, NextFunction} from 'express';
import IRequest from '../interfaces/expressInterfaces';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import catchAsync from "../utils/catchAsync";
import User from '../models/userModel';
import IUser from '../interfaces/userInterface';
import AppError from '../utils/appError';
import resetPasswordEmail from '../public/forgotPassword';
import sendMail from '../utils/sendMail'
import crypto from 'crypto';

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

export const signup = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const user: IUser = await User.create(req.body);
    createSendToken(user, 201, res);
});

export const login = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
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
    });
});

export const protect = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    let token;
    if (!req.headers.authorization || !req.headers.authorization.startsWith('bearer')) {
        return next(new AppError('You are not logged in! Please log in to get access', 401));
    }
    token = req.headers.authorization.split(' ')[1];
    if (!process.env.JWT_SECRET) {
        return new AppError('config file is not exist', 404);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError('The user belonging to this token does no longer exist!', 401));
    }
    req.user = user;
    next();
});

export const forgotPassword = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const user = await User.findOne({email: email}) as IUser;
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    const resetToken = user.createResetToken;
    await user.save({validateBeforeSave: false});
    const resetURL: string = `${req.protocol}://${req.get('host')}/api/v1/auth/${resetToken}`;
    const message = resetPasswordEmail.replace('{{resetURL}}', resetURL);
    try {
        await sendMail({
            email,
            subject: 'Your password reset token is valid for 10 min',
            message
        });
        res.status(200).json({
            status: 'success'
        });
    }
    catch(err) {
        user.passwordResetToken = user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});

export const resetPassword = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.params.token;
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({passwordResetToken: hashToken, passwordResetExpires: {$gt: Date.now()}});

    if (!user) {
        return next(new AppError('Token is invalid or has expired', 404));
    }
    user.password = user.confirmPassword = req.body.password;
    user.passwordResetToken = user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        status: 'sucess',
        data: user
    });
});