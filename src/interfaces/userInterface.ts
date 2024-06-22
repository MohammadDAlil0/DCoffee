import { ObjectId } from 'mongoose';

interface IUser extends Document {
    id: ObjectId
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    photo?: string;
    address?: string;
    role?: 'admin' | 'user';
    cartID?: string;
    phoneNumber?: number;
    isModified(path: string): boolean; // Define isModified for TypeScript
  }

  export default IUser;
