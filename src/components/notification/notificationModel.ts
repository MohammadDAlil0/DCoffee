import mongoose, { mongo, Schema } from "mongoose";
import { INotification } from "./notificationSchema";


const notificationSchema: Schema<INotification> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A notification must belong to a user']
    },
    message: {
        type: String,
        required: [true, 'A notification must have a message']
    },
    viewed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model<INotification>('Notification', notificationSchema);