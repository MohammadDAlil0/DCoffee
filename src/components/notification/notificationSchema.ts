import { ObjectId } from 'mongodb';
import {z} from 'zod';

export interface INotification extends Document {
    userId: ObjectId,
    message: string,
    viewed: boolean,
    createdAt: Date
};

export const zodValidateID = z.object({
    params: z.object({
        id: z
        .string()
        .refine((val) => {
            return ObjectId.isValid(val);
        }, {
            message: 'Invalid ObjectID'
        })
    })
});
