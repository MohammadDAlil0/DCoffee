import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, './../config.env')});
import app from './express/app'

mongoose.connect(process.env.DATABASE_LOCAL!).then(() => {
    console.log('Connected to database successfuly!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
