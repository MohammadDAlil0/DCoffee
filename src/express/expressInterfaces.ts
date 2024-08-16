import {Request} from 'express';
import {IUser} from '../components/user/userSchema';

interface IRequest extends Request {
    user?: IUser
}

export default IRequest;