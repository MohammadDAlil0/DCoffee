import {Request, Response, NextFunction} from 'express';
import IError from '../interfaces/ErrorInterface';

export default (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: IError) => {
        next(err);
    });
}
