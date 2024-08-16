import express from 'express';
import authRouter from '../components/auth/authRoutes';
import userRouter from '../components/user/userRoutes';
import errorController from './errorController';
import middlewares from './expressMidllwares';

const app: express.Application = express();

app.use(middlewares);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorController);


export default app;