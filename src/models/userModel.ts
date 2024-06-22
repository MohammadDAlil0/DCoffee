import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import validator, { isLowercase } from 'validator';
import IUser from '../interfaces/userInterface';

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        lowecase: true,
        validate: [validator.isEmail, 'Invalid Email'],
        unique: true,
        required: [true, 'A user must have an email']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: [8, 'A password must be more than 8 characters'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(this: IUser, val: String) {  
                return val === this.password
            },
            message: 'Passwords are not the same'
        },
        select: false
    },
    photo: String,
    address: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        select: false
    },
    cartID: String,
    phoneNumber: Number
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = this.cartID = this.phoneNumber = undefined;
});

export default mongoose.model('User', userSchema);