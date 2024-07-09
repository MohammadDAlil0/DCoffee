import {Request} from 'express';
import IUser from './userInterface';

interface IRequest extends Request {
    user: IUser
}

export default IRequest;