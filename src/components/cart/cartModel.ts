import mongoose, { mongo, Schema } from "mongoose";
import { ICart } from "./cartSchema";


const cartSchema: Schema<ICart> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A cart must belong to a user']
    },
    status: {
        type: String,
        enum: ['cart', 'On-Going', 'On-Way', 'delivered', 'rejected'],
        default: 'cart'
    },
    dateToDelivered: Date,
    products: {
        type: [{
            productID: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product'
            },
            amount: Number,
            price: Number
        }],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    adress: String,
    reason: String,
    deliverdTime: Date
});

export default mongoose.model<ICart>('Cart', cartSchema);


