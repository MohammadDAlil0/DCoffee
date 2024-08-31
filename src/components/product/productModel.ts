import mongoose, { Schema } from 'mongoose';
import { IProduct } from './productSchema';

const productSchema: Schema<IProduct> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A prodcut must have a title']
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    amount: {
        type: Number,
        required: [true, 'A product must have an amount']
    },
    description: String,
    photo: String,
    category: {
        type: String,
        enum: ['Drinks', 'Sweets', 'Coffee', 'Others']
    },
    tags: [String],
    numOfVoters: {
        type: Number,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    }
});

export default mongoose.model<IProduct>('Product', productSchema);