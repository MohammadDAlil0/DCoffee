import { Request, Response, NextFunction } from "express"
import IError from "../interfaces/ErrorInterface"

const sendErrDev = (err: IError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err
    });
}

const sendErrProd = (err: IError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}

export default (err: IError, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 11000) {
        err.message = `There is another user has this ${Object.keys(err.keyValue)}, please change '${Object.values(err.keyValue)}' and try again!`;
        err.statusCode = 400;
        err.status = 'error';
    }
    if (err.code === 'ETIMEDOUT') {
        err.message = 'It took a lot of time getting data. Be sure codeforces is working correctly handling requstes then try again.';
        err.statusCode = 504
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    if (process.env.NODE_ENV === 'development') {
        sendErrDev(err, res);
    }   
    else {
        sendErrProd(err, res);
    }
}